//Variables
var video = document.getElementById("video");
var addquestion = document.getElementById("add-question-button");

var videoSrc = video.children[0].getAttribute("src");
//Obtenemos el nombre del video
var videoName = videoSrc.substring(videoSrc.lastIndexOf('/') + 1, videoSrc.lastIndexOf('_'));

var quiz;
var score = [];
var buttonAQClicked = false;

document.addEventListener('onload', getQuizJSON(videoName));
document.getElementById("video-form").addEventListener('change', () => {
    videoSrc = video.children[0].getAttribute("src");
    videoName = videoSrc.substring(videoSrc.lastIndexOf('/') + 1, videoSrc.lastIndexOf('_'));
    getQuizJSON(videoName);
});

function getQuizJSON(name) {
    var xhttp = new XMLHttpRequest();
    xhttp.open('GET', `/json/quiz-${name}.json`, true)
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
                                if (equals(quiz.Quiz[i]["correctAnswer"], quiz.Quiz[i]["answers"][j]) && score[i] < 0) {
                                    //Respuesta correcta
                                    score[i] = 1;
                                    document.getElementById("score-result").innerHTML = "Score: " + getScore();
                                } else {
                                    //Respuesta incorrecta
                                    if (score[i] < 0) {
                                        score[i] = 0;
                                    }
                                }
                                document.getElementById("correct-answer-value").innerHTML = "Respuesta Correcta: " + quiz.Quiz[i]["correctAnswer"];
                            });
                        }
                    }
                }
            });
        }
    }
}


addquestion.addEventListener('click', () => {
    var formcontainer = document.getElementById("form-container");
    if (!buttonAQClicked) {
        buttonAQClicked = true;
        addquestion.value = "Cerrar";

        //Show form
        formcontainer.style.display = "inline-block";
    } else {
        buttonAQClicked = false;
        addquestion.value = "Añadir Preguntas";

        //Hide form
        formcontainer.style.display = "none";
    }
});

function equals(str1, str2) {
    if (str1.length == str2.length) {
        for (let i = 0; i < str1.length; i++) {
            if (str1[i] != str2[i]) {
                return false;
            }
        }
    } else {
        return false;
    }
    return true;
}

function getScore() {
    let result = 0;
    for (let i = 0; i < score.length; i++) {
        if (score[i] == 1) {
            result++;
        }
    }
    return result;
}

function validateForm() {
    //Comprobamos que todos los inputs son validos
    for (let i = 0; i < document.forms["question-adder"].length; i++) {
        let x = document.forms["question-adder"][i].value;
        if (x == "") {
            alert("El formulario no está completo");
            return false;
        }
    }
    writeQuestion();
    //Eliminamos los valores enviados
    for (let i = 0; i < document.forms["question-adder"].length - 1; i++) {
        document.forms["question-adder"][i].value = "";
    }
}

function writeQuestion() {
    var sec = Number(document.forms["question-adder"]["min"].value) * 60 + Number(document.forms["question-adder"]["sec"].value);
    newQuiz = {
        "id": quiz.Quiz.length,
        "question": document.forms["question-adder"]["question"].value,
        "answers": [document.forms["question-adder"]["answer1"].value, document.forms["question-adder"]["answer2"].value, document.forms["question-adder"]["answer3"].value],
        "correctAnswer": document.forms["question-adder"]["correct-answer"].value,
        "time": sec
    };
    quiz.Quiz.push(newQuiz);
    console.log(quiz.Quiz);
    
    //window.location.href
    let url = "https://gdie2305.ltim.uib.es/";
    fetch(url, {
        method: "POST",
        body: JSON.stringify(newQuiz),
        headers: {
            "Content-Type": "application/json; charset=UTF-8"
        },
        mode: 'cors'
    }).then(response => response.json())
    .then(json => console.log(json))
    .catch((err) => console.log(err));
}