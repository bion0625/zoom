const messageList = document.querySelector('ul');
const messageForm = document.querySelector('form');
const socket = new WebSocket(`ws://${window.location.host}`);

socket.addEventListener("open", () => {
    console.log("Connected to Browser ✔");
});

socket.addEventListener("message", message => {
    console.log("New message: ", message.data);
    const li = document.createElement("li");
    li.innerText = message.data;
    messageList.prepend(li);
})

socket.addEventListener("close", () => {
    console.log("Disconnected to Browser ❌");
});

const handleSubmit = (event) => {
    event.preventDefault();
    const input = messageForm.querySelector("input");
    socket.send(input.value);
    input.value ="";
}

messageForm.addEventListener("submit", handleSubmit);