import"./main-bO7efQIr.js";import{a as r}from"./postData-k9C_udXj.js";const a=document.querySelector("#btn"),s=window.location.href.split("?")[1].split("=")[1];a.addEventListener("click",o=>{o.preventDefault();const e=document.querySelector("#groupName").value.trim(),t=document.querySelector("#password").value.trim();e.length>0&&t.length>0?r({groupName:e,password:t,userName:s},!0):alert("Provide values for all field")});
