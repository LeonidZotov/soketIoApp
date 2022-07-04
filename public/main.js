var socket = io();

var form = document.getElementById('form');
var input = document.getElementById('input');
var div = document.getElementById('address');
address = '';
room = '';

while (!address && !room) {
  address = prompt('address:');
  room = prompt('Room Id:');
}

console.log(address, room);
div.innerHTML = address;

socket.emit('joinRoom', { address, room });
console.log(`emmiting to join room: ${room}`);

form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (input.value) {
    socket.emit('chatMessage', input.value);
    input.value = '';
  }
});
socket.on('message', (msg) => {
  var item = document.createElement('li');
  item.textContent = msg;
  messages.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
});
