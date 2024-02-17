const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const app = express();
const { createServer } = require("http");
const server = createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const port = 3000;
const db = require("./db");

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/userpage", (req, res) => {
    res.sendFile(path.join(__dirname, "public/userPage.html"));
});

app.get("/signup", (req, res) => {
    res.sendFile(path.join(__dirname, "public/signup.html"));
});

app.get("/joinRoom", (req, res) => {
    res.sendFile(path.join(__dirname, "public/joinRoom.html"));
});

app.get("/createRoom", (req, res) => {
    res.sendFile(path.join(__dirname, "public/createRoom.html"));
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

io.on("connection", () => {
    console.log("One user connected");
});

server.listen(port, () => {
    console.log(`Server started on http://localhost:${port}/`);
});