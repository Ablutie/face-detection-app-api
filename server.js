const express = require("express"),
    bcrypt = require("bcrypt-nodejs"),
    cors = require("cors"),
    bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(cors());

let database = {
    users: [
        {
            name: "john",
            id: "123",
            email: "john@gmail.com",
            password: "hello",
            photos: 0,
            joined: new Date()
        },
        {
            name: "ann",
            id: "124",
            email: "ann@gmail.com",
            password: "bye",
            photos: 0,
            joined: new Date()
        }
    ]
}

app.get("/", (req, res) => {
    res.json(database);
});

app.post("/signin", (req, res) => {
    if (req.body.email === database.users[0].email &&
        req.body.password === database.users[0].password) {
            res.status(200).json(database.users[0]);
        } else {
            res.status(400).json("error signing in");
        }
});

app.get("/users/:id", (req, res) => {
    let found = false;
    database.users.forEach(user => {
        if (user.id === req.params.id) {
            found = true;
            return res.json(user);
        }
    });
    if (!found) {
        res.status(404).json("user not found");
    }
});

app.put("/photo", (req, res) => {
    let found = false;
    database.users.forEach(user => {
        if (user.id === req.body.id) {
            found = true;
            user.photos++;
            return res.json(user.photos);
        }
    });
    if (!found) {
        res.status(404).json("user not found");
    }
});

app.post("/register", (req,res) => {
    // let currentHash;
    console.log("registering");
    // bcrypt.hash(req.body.password, null, null, function(err, hash) {
    //     currentHash = hash;
    //     console.log(hash);
    // });
    database.users.push({
        name: req.body.name,
        id: "125",
        email: req.body.email,
        password: req.body.password,
        photos: 0,
        joined: new Date()
    });
    res.json(database.users[database.users.length - 1]);
});

app.listen(3001, () => {
    console.log("listening on port 3001");
});