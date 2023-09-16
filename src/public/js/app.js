const messageList = document.querySelector('ul');
const messageForm = document.querySelector('#massage');
const nickForm = document.querySelector('#nick');
const socket = new WebSocket(`ws://${window.location.host}`);

const makeMassage = (type, payload) => {
    const msg = {type, payload};
    return JSON.stringify(msg);
}

socket.addEventListener("open", () => {
    console.log("Connected to Browser ✅");
});

socket.addEventListener("message", message => {
    console.log("New message: ", message.data);
    const li = document.createElement("li");
    li.innerText = message.data;
    messageList.append(li);
})

socket.addEventListener("close", () => {
    console.log("Disconnected to Browser ❌");
});

const handleSubmit = (event) => {
    event.preventDefault();
    const input = messageForm.querySelector("input");
    socket.send(makeMassage("new_message",input.value));
    input.value ="";
}

const handleNickSubmit = (event) => {
    event.preventDefault();
    const input = nickForm.querySelector("input");
    socket.send(makeMassage("nickname",input.value));
    input.value ="";
}

messageForm.addEventListener("submit", handleSubmit);
nickForm.addEventListener("submit", handleNickSubmit);