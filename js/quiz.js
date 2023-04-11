var video = document.getElementById("video");
var quiz;

const xhttp = new XMLHttpRequest();
xhttp.open('GET', '/json/quiz.json', true)
xhttp.send();
xhttp.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    quiz = JSON.parse(this.responseText);
    
    for(let i = 0; i < quiz.Quiz.length; i++){
        console.log(quiz.Quiz[i]["question"]);
    }


    video.addEventListener('timeupdate', () => {
        for(let i = 0; i < quiz.Quiz.length; i++){
            
            if(quiz.Quiz[i]["time"] == Math.round(video.currentTime)){
                console.log("Pregunta: " + quiz.Quiz[i]["question"]);
                for(let j = 0; j < quiz.Quiz[i]["answers"].length; j++){
                    console.log("Respuesta " + j + ": " + quiz.Quiz[i]["answers"][j]);
                }
                console.log("\nRESPUESTA CORRECTA: " + quiz.Quiz[i]["correctAnswer"]);
            }
        }
    });
  }
}
