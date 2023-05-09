const express= require("express");
const bodyParser= require("body-parser");
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const saltRounds = 10;
const session = require('express-session');
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const https= require("https");

const app= new express();

// app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({
  extended:true
}));
app.use(session({
  secret: "this is white board",
  resave: false,
  saveUninitialized: true,

}));
app.use(passport.initialize());
app.use(passport.session());
mongoose.set('strictQuery', false);
mongoose.connect("mongodb://localhost:27017/boardDB",{
  useNewUrlParser: true,
  useUnifiedTopology: true,
  family: 4,
});

const boardSchema = new mongoose.Schema({
  email:String,
  password: String
});

const Board =  mongoose.model("Board", boardSchema);
// boardSchema.plugin(pa)
app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
})


// app.post("/",function(req,res){
//     res.sendFile(__dirname+"/public/CANVASBOARD/index.html");
// })
app.post("/signup",function(req,res){
    res.sendFile(__dirname+"/signup.html");
})
app.post("/login",function(req,res){
    res.sendFile(__dirname+"/login.html");
})
app.post("/home",function(req,res){
    res.sendFile(__dirname+"/index.html");
})
app.post("/canvas",function(req,res){
    res.sendFile(__dirname+"/public/CANVASBOARD/index.html");
});

app.get("/signup",function(req,res){
  res.sendFile(__dirname + "/signup.html");
});

app.post("/signup",async function(req,res){
  bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
    // Store hash in your password DB.
    const newUser = new Board({
      email: req.body.email,
      password: hash
    });
    newUser.save().then(function(err){
      if(err){
        console.log(err)
      }
      else{
        res.sendFile(__dirname + "/board.html");
      }
    })
});
  
// newUser.save(function(err){ // use .then
});
app.get("/login", function(req,res){
  res.sendFile(__dirname + "/login.html");
})
app.post("/login", async function(req,res){
  const email = req.body.email;
  const password = req.body.password;

try{ 
  const foundUser = await Board.findOne({  email: email });
  if(foundUser){
    const isPasswordMatch = await bcrypt.compare(password, foundUser.password);
    if(isPasswordMatch){
      res.sendFile(__dirname + "/index.html");
    }
    else{
      res.status(401).json({message: "Invalid"})
    }
  }
  else{
    res.status(401).json({message: "Invalid"})
  }
}
   catch(err){
    console.log(err);
  res.status(500).json({ message: "Server error" });
   }
)}



app.listen(3000,function(){
    console.log("Server started at port 3000");
})
