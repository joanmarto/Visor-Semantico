const socket = io();
const messages = document.getElementById('message-chat');
const btn = document.getElementById('send-msg-btn');
const input = document.getElementById("chat-text-area");

var userName;
var loggedUser = false;

btn.addEventListener('click', (e) => {
    e.preventDefault();
    //console.log("enviando mensage: " + input.value);
    if(input.value){
        if(loggedUser){
            //console.log("Usuario -> " + userName);
            //console.log(userName + ": " + input.value);
            socket.emit('chat message', userName + ": " + input.value);
        }else{
            userName = getName(input.value);
            loggedUser = true;
        }
        input.value = '';
    }
});

socket.on('chat message', (msg) => {
    const item = document.createElement('li');
    item.textContent = msg;
    messages.appendChild(item);
    window.scrollTo(0, messages.scrollHeight);
});

function getName(data){
    return data.substring(data.indexOf(':') + 2, data.length);
}