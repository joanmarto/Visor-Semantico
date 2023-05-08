const socket = io();
const messages = document.getElementById('message-chat');
const btn = document.getElementById('send-msg-btn');
const input = document.getElementById("chat-text-area");

btn.addEventListener('click', (e) => {
    e.preventDefault();
    console.log("enviando mensage: " + input.value);
    if(input.value){
        socket.emit('chat message', input.value);
        input.value = '';
    }
});

socket.on('chat message', (msg) => {
    const item = document.createElement('li');
    item.textContent = msg;
    messages.appendChild(item);
    window.scrollTo(0, messages.scrollHeight);
});
