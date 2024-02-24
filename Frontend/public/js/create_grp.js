import { postGroupData } from "./postData";

const btn = document.querySelector("#btn");
const userName = window.location.href.split("?")[1].split("=")[1];

btn.addEventListener("click", (event)=>{
    event.preventDefault();
    const groupname = document.querySelector("#groupName").value.trim();
    const password = document.querySelector("#password").value.trim();
    if(groupname.length > 0 && password.length > 0){
        const obj = {
            groupName : groupname,
            password: password,
            userName : userName 
        };
        postGroupData(obj, false);
    }
    else{
        alert("Provide values for all field");
    }
});


