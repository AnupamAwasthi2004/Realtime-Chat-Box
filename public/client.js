const socket = io();
let name1;
let textarea = document.querySelector("#textarea");
let messageArea = document.querySelector(".message__area");
do {
  name1 = prompt("Please enter your name");
} while (!name1);

textarea.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    sendMessage(e.target.value);
  }
});

function sendMessage(message) {
  let msg = {
    user: name1,
    message: message.trim(),
  };

  // Append message in dom
  appendMessage(msg, "outgoing");
  textarea.value = "";
  scrollToBottom();

  // send to server

  socket.emit("message", msg);
}

function appendMessage(msg, type) {
  let mainDiv = document.createElement("div");
  let className = type;
  mainDiv.classList.add(className, "message");

  let markup = `
    <h4>${msg.user}</h4>
    <p>${msg.message}</h4>
  `;
  mainDiv.innerHTML = markup;
  messageArea.appendChild(mainDiv);
}

// Receive Message

socket.on("message", (msg) => {
  appendMessage(msg, "incoming");
});

appendMessage(msg, "incoming");

// to make pointer at down side

function scrollToBottom() {
  messageArea.scrollTop = messageArea.scrollHeight;
}
