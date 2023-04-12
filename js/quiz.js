var video = document.getElementById("video");
var quiz;
var score = [];

const xhttp = new XMLHttpRequest();
xhttp.open('GET', '/json/quiz.json', true)
xhttp.send();
xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        quiz = JSON.parse(this.responseText);

        //Inicialización de la puntuación
        // 0 => Incorrecto
        // 1 => Correcto
        // -1 => Sin responder
        for (let i = 0; i < quiz.Quiz.length; i++) {
            score[i] = -1;
        }

        video.addEventListener('timeupdate', () => {
            for (let i = 0; i < quiz.Quiz.length; i++) {

                if (quiz.Quiz[i]["time"] == Math.round(video.currentTime)) {
                    //Se muestra la pregunta
                    document.getElementById("quiz-question").innerHTML = quiz.Quiz[i]["question"];
                    document.getElementById("correct-answer-value").innerHTML = "Respuesta Correcta: ";
                    for (let j = 0; j < quiz.Quiz[i]["answers"].length; j++) {
                        let opcion = document.getElementById(`answer${j + 1}`);
                        //Se muestran las posibles respuestas
                        opcion.innerHTML = quiz.Quiz[i]["answers"][j];
                        opcion.addEventListener('click', () => {
                            if (equals(quiz.Quiz[i]["correctAnswer"], quiz.Quiz[i]["answers"][j]) && score[i]<0) {
                                //Respuesta correcta
                                score[i] = 1;
                                document.getElementById("score-result").innerHTML = "Score: " + getScore();   
                            }else{
                                //Respuesta incorrecta
                                if(score[i] < 0){
                                    score[i] = 0;
                                }
                            }
                            document.getElementById("correct-answer-value").innerHTML = "Respuesta Correcta: " +  quiz.Quiz[i]["correctAnswer"];  
                        });
                    }
                }
            }
        });
    }
}

function equals(str1, str2){
    if(str1.length == str2.length){
        for(let i = 0; i < str1.length; i++){
            if(str1[i] != str2[i]){
                return false;
            }
        }
    }else{
        return false;
    }
    return true;
}

function getScore(){
    let result = 0;
    for(let i = 0; i < score.length; i++){
        if(score[i] == 1){
            result++;
        }
    }
    return result;
}