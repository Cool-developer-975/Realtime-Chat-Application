import { postData } from "./postData";

const btn = document.querySelector("#btn");
      btn.addEventListener("click", (e)=>{
        e.preventDefault();
        const userName = document.querySelector("#username").value;
        const password = document.querySelector("#password").value;
        if(userName.length > 0 && password.length > 0){
          postData({"userName": userName, "password":password}, true);
        }
        else{
          alert("Enter valid values");
        }
});