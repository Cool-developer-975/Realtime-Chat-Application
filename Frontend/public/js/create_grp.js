import { postGroupData } from "./postData";

const btn = document.querySelector("#btn");
const userName = window.location.href.split("?")[1].split("=")[1];

function containsSpace(name){
  for(let ch of name){
    if(ch === " "){
      return true;
    }
  }
  return false;
}

btn.addEventListener("click", (event)=>{
    event.preventDefault();
    const groupname = document.querySelector("#groupName").value.trim();
    const password = document.querySelector("#password").value.trim();

    if(groupname.length > 0 && password.length > 0){
        if(!containsSpace(groupname)){
            const obj = {
                groupName : groupname,
                password: password,
                userName : userName 
            };
            postGroupData(obj, false);
        }
        else{
            alert("Enter name without spaces in between or use '_' or '-'");
        }
    }
    else{
        alert("Provide values for all field");
    }
});


