const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const app = express();
const { createServer } = require("http");
const server = createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const port = 3000;
const users = {};
const groups = {};

app.use(express.static(path.join(__dirname,"public")));
app.use(bodyParser.json());

app.get("/", (req, res)=>{
    res.sendFile(path.join(__dirname,"public","index.html"));
});

app.get("/userpage", (req, res)=>{
    res.sendFile(path.join(__dirname, "public/userPage.html"));
});

app.get("/signup", (req, res)=>{
    res.sendFile(path.join(__dirname, "public/signup.html"));
});

app.get("/joinRoom", (req, res)=>{
    res.sendFile(path.join(__dirname, "public/joinRoom.html"));
});

app.get("/createRoom", (req, res)=>{
    res.sendFile(path.join(__dirname, "public/createRoom.html"));
});

app.post("/login",(req, res)=>{
    const {userName, password} = req.body;
    if(userName in users){
        if(users[userName]["password"] === password)
        res.status(200).json({"userName" : userName});
        else
        res.status(404).json({error : "Wrong Password"});
    }
    else{
        res.status(404).json({error : "Username not Found"});
    }
});

app.post("/signup", (req, res) => {
    const { userName, password, email } = req.body;
    
    if (!(userName in users)) {
        let flag = false;

        for (let user in users) {
            if (users[user].email === email) {
                flag = true;
                break;
            }
        }

        if (!flag) {
            users[userName] = {
                "password": password,
                "email": email,
            };
            res.status(200).json({ success: true, message: "User registered successfully" });
        } else {
            res.status(400).json({ error: "Email already taken" });
        }
    } else {
        res.status(400).json({ error: "Username already taken" });
    }
});

//websockets

io.on("connection",()=>{
    console.log("One user connected");
});

server.listen(port, ()=>{
    console.log(`Server started on http://localhost:${port}/`);
});