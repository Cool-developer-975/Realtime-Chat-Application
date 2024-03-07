import { postData } from "./postData";

function containsSpace(name){
  for(let ch of name){
    if(ch === " "){
      return true;
    }
  }
  return false;
}

const btn = document.querySelector("#btn");
btn.addEventListener("click", (e) => {
  e.preventDefault();
  const userName = document.querySelector("#username").value.trim();
  const password = document.querySelector("#password").value.trim();
  const email = document.querySelector("#email").value.trim();
  
    if (userName.length > 0 && password.length > 0 && email.length > 0) {
      if(!containsSpace(userName)){
        postData({ "userName": userName, "password": password, "email": email }, false);
      }
      else{
        alert("Enter name without spaces in between or use '_' or '-'");
      }
    }
    else {
      alert("Enter valid values");
    }
});