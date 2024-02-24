const arr = window.location.href.split("?").slice(1);
const groupName = arr[0].split("=")[1];
const userName = arr[1].split("=")[1];
document.querySelector("#heading").textContent = groupName;
const chatBox = document.querySelector("#chatbox");
const btn = document.querySelector("#btn");


//socket io

const socket = io();
socket.connect();
socket.emit("user-info", groupName);

socket.on("incomming-msg",(obj)=>{
    addMsg(obj,false);
});


btn.addEventListener("click", (e)=>{
    const input = document.querySelector("#msg");
    const msg = input.value.trim();
    input.value = "";
    if(msg.length > 0){
        const obj = {
            userName:userName,
            groupName:groupName,
            message:msg,
        }
        addMsg(obj,true);
        socket.emit("outgoing-msg", obj);
    }
    else{
        alert("cannot send empty message");
    }
});


function addMsg(obj, send){
    const Container = document.createElement("div");
    const msgbox = document.createElement("div");
    const title = document.createElement("p");
    const msg = document.createElement("p");
    Container.classList.add("flex", ((send)? "justify-end" : "justify-start") );
    msgbox.classList.add((send)? "bg-green-500": "bg-blue-500", "text-black", "p-2", "rounded-lg", "max-w-xs");
    title.classList.add("text-xs", ((send)? "text-blue-200" : "text-white"));
    title.textContent = (send)? "You" : obj.userName;
    msg.textContent = obj.message;
    msgbox.appendChild(title);
    msgbox.appendChild(msg);
    Container.appendChild(msgbox);
    chatBox.appendChild(Container);
}
