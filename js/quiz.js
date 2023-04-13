var video = document.getElementById("video");
var addquestion = document.getElementById("add-question-button");

var quiz;
var score = [];
var buttonAQClicked = false;

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

addquestion.addEventListener('click', () => {
    var formcontainer = document.getElementById("form-container");
    if(!buttonAQClicked){
        buttonAQClicked = true;
        addquestion.value = "Cerrar";

        //Show form
        formcontainer.style.display = "block";
    }else{
        buttonAQClicked = false;
        addquestion.value = "Añadir Preguntas";

        //Hide form
        formcontainer.style.display = "none";
    }
});

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

function validateForm() {
    //Comprobamos que todos los inputs son validos
    for(let i = 0; i < document.forms["question-adder"].length; i++){
        let x = document.forms["question-adder"][i].value;
        if (x == "") {
            alert("El formulario no está completo");
            return false;
        }
    }
    writeQuestion();
}

function writeQuestion(){
    //console.log("Next id: " + quiz.Quiz.length);
    var sec = Number(document.forms["question-adder"]["min"].value)*60 + Number(document.forms["question-adder"]["sec"].value);
    //alert("New time is: " + sec);
    newQuiz = {
        id: quiz.Quiz.length,
        question : document.forms["question-adder"]["question"].value,
        answers : [document.forms["question-adder"]["answer1"].value, document.forms["question-adder"]["answer2"].value, document.forms["question-adder"]["answer3"].value],
        correctAnswer: document.forms["question-adder"]["correct-answer"].value,
        time: sec
    };
    /*
    // Creating a XML object
    let xhr = new XMLHttpRequest();
    let url = "/json/quiz-prueba.json";
    console.log("Checkpoint line 121");
    // open a connection
    xhr.open("POST", url, true);

    // Set the request header i.e. which type of content you are sending
    xhr.setRequestHeader("Content-Type", "application/json");
    console.log("Checkpoint line 127");
    // Create a state change callback
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {

            // Print received data from server
            console.log("Print received data from server: " + this.responseText);

        }else{
            alert("Error");
        }
    };
    console.log("Checkpoint line 139");
    // Converting JSON data to string
    var data = JSON.stringify(newQuiz);

    // Sending data with the request
    xhr.send(data);
    alert("wait");
    */

    //window.location.href
    fetch("/json/quiz-prueba.json", {
        method: "POST",
        body: JSON.stringify(newQuiz),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      })
        .then((response) => response.json())
        .then((json) => console.log(json));

    alert("wait");
    alert("window.location.href: " + window.location.href)
}