const express = require("express");
const path = require("path");
const fs = require("fs");
const bodyParser = require("body-parser");
const app = express();
const { createServer } = require("https");
const server = createServer({
    key: fs.readFileSync(path.join(__dirname,"cert","key.pem")),
    cert: fs.readFileSync(path.join(__dirname,"cert","cert.pem"))
},app);
const { Server } = require("socket.io");
const io = new Server(server);
const port = 3000;
const db = require("./db");
let groups = new Map();

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());


//routes

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/userpage", (req, res) => {
    res.sendFile(path.join(__dirname, "public/userPage.html"));
});

app.get("/signup", (req, res) => {
    res.sendFile(path.join(__dirname, "public/signup.html"));
});

app.get("/joinGroup", (req, res) => {
    res.sendFile(path.join(__dirname, "public/joinRoom.html"));
});

app.get("/createGroup", (req, res) => {
    res.sendFile(path.join(__dirname, "public/createRoom.html"));
});

app.post("/joinGroup/jgrp", async (req, res)=>{
    const obj = req.body;
    const response = await db.joinGroup(obj);
    if(response === "success"){
        res.status(200).json({ "userName": obj.userName });
    }
    else if(response === "Group_name or password is incorrect"){
        res.status(401).json({error: response});
    }
    else if(response === "Error"){
        res.status(401).json({error: "Something went wrong"});
    }
    else{
        res.status(401).json({error: "Something went wrong"});
    }
});

app.post("/createGroup/cgrp", async(req, res)=>{
    const obj = req.body;
    const response = await db.createGroup(obj);
    if(response === "group created successfully"){
        console.log("group created successfully");
        res.status(200).json({success:true});
    }
    else if(response === "Group already exists"){
        res.status(401).json({error: response});
    }
    else if(response === "Group name or password not provided"){
        res.status(401).json({error: response});
    }
    else if(response === "failed to create new group"){
        res.status(400).json({error: response});
    }
    else{
        res.status(400).json({error: "Something went wrong"});
    }
});

app.get("/group", (req, res)=>{
    res.sendFile(path.join(__dirname, "public","chat.html"));
});

app.post("/login", async (req, res) => {
    const obj = {
        userName: req.body.userName,
        password: req.body.password,
    };
    const exists = await db.userLogin(obj);
    if (exists === true) {
        res.status(200).json({ "userName": obj.userName });
    }
    else {
        res.status(401).json({ error: "Username or password is incorrect" });
    }
});

app.post("/signup", async (req, res) => {
    const obj = {
        userName: req.body.userName,
        email: req.body.email,
        password: req.body.password
    };

    const result = await db.addUser(obj);

    if (result === "Added user successfully") {
        res.status(201).json({ userName: obj.userName });
    }
    else if (result === "username or email already exists") {
        res.status(400).json({ error: result });
    }
    else if (result === "Record not provided") {
        res.status(400).json({ error: result });
    }
    else if (result === "Failed to add user") {
        res.status(400).json({ error: result });
    }
});

//websockets

io.on("connection", (socket) => {
    
    console.log("One user connected");

    socket.on("user-info",(groupName, callback)=>{
        socket.join(groupName);
        if(groups.has(groupName)){
            groups.set(groupName, groups.get(groupName) + 1);
        }
        else{
            groups.set(groupName, 1);
        }
        let cnt = groups.get(groupName);
        io.to(groupName).emit("update-cnt",{cnt: cnt});
        callback({cnt : cnt});
    });

    socket.on("outgoing-msg", (obj)=>{
        socket.to(obj.groupName).emit("incomming-msg",obj);
    });

    socket.on("typing",(obj)=>{
        socket.to(obj.groupName).emit("someone-typing",obj);
    });

    socket.on("leaving",(obj)=>{
        groups.set(obj.groupName, groups.get(obj.groupName) - 1);
        if(groups.get(obj.groupName) === 0){
            groups.delete(obj.groupName);
        }
        else{
            io.to(obj.groupName).emit("left",{userName : obj.userName, cnt : groups.get(obj.groupName)});
        }
    });


});


server.listen(port, () => {
    console.log(`Server started on https://localhost:${port}/`);
});