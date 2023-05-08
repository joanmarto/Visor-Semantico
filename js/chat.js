const socket = io();
const messages = document.getElementById('message-chat');
const form = document.getElementById('form-chat-text-area');
const input = document.getElementById("chat-text-area");

form.addEventListener('submit', (e) => {
    e.preventDefault();
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
