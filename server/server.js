var express = require('express')
const cors = require('cors');
var bodyParser = require('body-parser')
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Db = require("./db");

//initialize db
const db = new Db();
console.log(db.connectDB());

var app = express()
app.use(cors());
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const verifyJWT = (req, res, next) => {
    let token = req.headers["x-access-token"];
    console.log(token);
    if(!token) {
        res.send({auth:false, message:"Failed to authenticate"});
    }
    else {
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                console.log(err);
                res.send({auth: false, message: "Failed to authenticate"}); //invalid credentials
            }
            else {
                req.userId = decoded.id;
                next();
            }
        });
    }
}

app.get('/isAuthed', verifyJWT, (req, res) => {
    res.send({auth: true, message: "Authorized"});
})

app.post('/register', async (req, res) => {
    let info = req.body;
    console.log(req.body);
    console.log(info.email);

    if(info.password.length < 5) {
        console.log("password too short")
        res.status(403).send("Please make password longer")
        return;
    }
    else if(info.password != info.passwordConfirm) {
        console.log("password not match")

        res.status(403).send("Passwords do not match")
        return;
    }
    else {//Attempt to register the user
        let regSuccess = await db.registerUser(info.email, info.username, bcrypt.hashSync(info.password, 12));
        if(regSuccess == 0) { // username taken
            res.status(403).send("Failed to register user, Username already in use")
        }
        else if (regSuccess == 1) { // email taken
            res.status(403).send("Failed to register user, Email already in use")
        }
        else {
            res.sendStatus(200);
        }
    }
})

app.post('/login', async (req, res) => {
    let info = req.body;
    console.log(req.body);
    console.log(info.email);
    //check login info
    let user = await db.findUserByEmail(info.email);
    if(bcrypt.compareSync(req.body.password, user.password)) { //if successful login
        let token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: 86400
        });
        res.json({auth: true, token: token});
    }
    else {
        res.status(403).json({auth: true, message:"invalid credentials"});
    }
})
var port = process.env.PORT || 5000

app.listen(port, () => {
console.log('Server started at http://localhost:5000')
})