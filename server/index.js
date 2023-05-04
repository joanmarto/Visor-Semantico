const express = require('express');
const fs = require('fs');
const app = express();
const port = 80;

app.get('/', (req, res) => {
    res.sendFile('/home/gdie2305/Visor-Semantico/index.html');
});

app.listen(port, (requ, res) => {
    console.log(`Prueba escuchando en puerto ${port}`);
});

/*
app.post('/', (req, res) => {
    console.log('Request: ' + req.body);
    console.log('Response: ' + res.body);

    //Leemos el JSON
    
    var data = fs.readFileSync('Visor-Semantico/json/quiz-chess_video.json');
    var quiz = JSON.parse(data);
    console.log(quiz);

    //var newQuiz = req.body;
    var newQuiz = {"question": "?",
                    "answer": "yes"
                };
    //Añadimos el nuevo objeto
    quiz.push(newQuiz);

    //Escribimos en el JSON
    fs.writeFileSync('Visor-Semantico/json/quiz-chess_video.json', JSON.stringify(quiz), (err) => {
        //Error checking
        if(err) throw err;
        console.log("New quiz added");
    });
    
    var server = {"server":"Success"};
    //res.send(quiz);
    res.send(server);
    //res.send('OK');
});
*/
app.use(express.json());

app.post('/', (req, res) => {
    console.log("Request 2:" + req.body); // Imprimir los datos recibidos en la consola

    //Leemos el JSON
    var data = fs.readFileSync('Visor-Semantico/json/quiz-chess_video.json');
    var quiz = JSON.parse(data);

    var newQuiz = req.body;

    //Añadimos el nuevo objeto
    quiz.push(newQuiz);

    //Escribimos en el JSON
    fs.writeFileSync('Visor-Semantico/json/quiz-chess_video.json', JSON.stringify(quiz), (err) => {
        //Error checking
        if(err) throw err;
        console.log("New quiz added");
    });

    res.send(req.body); // Responder con una respuesta de "OK"
});

app.use(express.static('/home/gdie2305/Visor-Semantico/'));