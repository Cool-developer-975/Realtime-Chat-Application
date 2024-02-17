import { postData } from "./postData";

const btn = document.querySelector("#btn");
      btn.addEventListener("click", (e)=>{
        e.preventDefault();
        const userName = document.querySelector("#username").value.trim();
        const password = document.querySelector("#password").value.trim();
        const email = document.querySelector("#email").value.trim();
        if(userName.length > 0 && password.length > 0 && email.length > 0){
          postData({"userName": userName, "password":password, "email": email}, false);
        }
        else{
          alert("Enter valid values");
        }
        
      });