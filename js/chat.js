const socket = io();
const messages = document.getElementById('message-chat');
const btn = document.getElementById('send-msg-btn');
const input = document.getElementById("chat-text-area");

btn.addEventListener('click', (e) => {
    e.preventDefault();
    console.log("enviando mensage")
    if(input.value){
        socket.emit('chat mesage', input.value);
        input.value = '';
    }
});

socket.on('chat message', (msg) => {
    const item = document.createElement('li');
    item.textContent = msg;
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
});
