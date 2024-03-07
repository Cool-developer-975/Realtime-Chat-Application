const arr = window.location.href.split("?").slice(1);
const groupName = arr[0].split("=")[1];
const userName = arr[1].split("=")[1];
document.querySelector("#heading").textContent = groupName;
const chatBox = document.querySelector("#chatbox");
const btn = document.querySelector("#btn");
const input = document.querySelector("#msg");
const typingEl = document.querySelector("#typing");
const exitBtn = document.querySelector("#exit-btn");
const OnlineCountEl = document.querySelector("#online-cnt");
let isTyping = false;

console.log(OnlineCountEl);
//socket io


const socket = io();
socket.connect();
socket.emit("user-info", groupName, (response)=>{
    OnlineCountEl.textContent = `Online : ${response.cnt}`;
});
socket.on("update-cnt",(response)=>{
     OnlineCountEl.textContent = `Online : ${response.cnt}`;
});
socket.on("incomming-msg",(obj)=>{
    addMsg(obj,false);
});

socket.on("left",(obj)=>{
    OnlineCountEl.textContent = `Online : ${obj.cnt}`;
});

socket.on("someone-typing",(obj)=>{
    if(!isTyping){
        isTyping = true;
        typingEl.textContent = `${obj.userName} is typing....`;
        setTimeout(()=>{
            typingEl.textContent = "";
            isTyping = false;
        },3000);
    }
});


const sendMsg = ()=>{
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
};


exitBtn.addEventListener("click",(e)=>{
    if(socket.emit("leaving",{userName:userName, groupName:groupName})){
        socket.disconnect();
        window.location.href = `/userpage?userName=${userName}`;
    }
});

btn.addEventListener("click", sendMsg);

input.addEventListener("keydown",(e)=>{
    console.log("called");
    if(e.key === "Enter"){
        console.log("from");
        sendMsg();
    }
});

input.addEventListener("input",(e)=>{
    const obj = {
        userName:userName,
        groupName:groupName
    };
    socket.emit("typing",obj);
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
