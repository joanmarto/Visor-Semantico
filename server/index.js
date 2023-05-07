const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const fs = require('fs');

const app = express();
const port = 80;

const server = http.createServer(app);
const io = socketio(server);

app.get('/', (req, res) => {
    res.sendFile('/home/gdie2305/Visor-Semantico/index.html');
});

server.listen(port, (requ, res) => {
    console.log(`Prueba escuchando en puerto ${port}`);
});

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

io.on('connection', (socket) => {
    console.log("Se ha conectado alguien");
});

app.use(express.static('/home/gdie2305/Visor-Semantico/'));