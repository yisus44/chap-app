const socket = io("http://localhost:3000");
const messageForm = document.getElementById("send-container");
const messageInput = document.getElementById("message-input");
const messageContainer = document.getElementById("message-container");

const userName = prompt("What's your name?");
appendMessage("You Joined");

socket.emit("new-user", userName);

socket.on("chat-message", (data) => {
  console.log(data);
  appendMessage(`${data.name}:${data.message}`);
});

socket.on("user-connected", (name) => {
  appendMessage(`${name} connected`);
});

socket.on("user-disconnected", (name) => {
  appendMessage(`${name} disconnected`);
});

messageForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const message = messageInput.value;
  appendMessage(`You: ${data.message}`);
  socket.emit("send-chat-message", message);
  messageInput.value = "";
});

function appendMessage(message) {
  const messageElement = document.createElement("div");
  messageElement.innerText = message;
  messageContainer.append(messageElement);
}
