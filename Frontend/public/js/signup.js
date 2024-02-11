import { postData } from "./postData";

const btn = document.querySelector("#btn");
      btn.addEventListener("click", (e)=>{
        e.preventDefault();
        const userName = document.querySelector("#username").value;
        const password = document.querySelector("#password").value;
        const email = document.querySelector("#email").value;
        postData({"userName": userName, "password":password, "email": email}, false);
      });