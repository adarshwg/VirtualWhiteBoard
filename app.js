const express= require("express");
const bodyParser= require("body-parser");
const mongoose = require("mongoose");
const session = require('express-session');
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const https= require("https");

const app= new express();
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
app.post("/",function(req,res){
    res.sendFile(__dirname+"/public/CANVASBOARD/index.html");
})

app.get("/signup",function(req,res){
  res.render("signup");
});

app.post("/signup",async function(req,res){
  const newUser = new Board({
    email: req.body.email,
    password: req.body.password
  });
// newUser.save(function(err){ // use .then

newUser.save().then(function(err){
  if(err){
    console.log(err)
  }
  else{
    res.render("board");
  }
})
});


app.listen(3000,function(){
    console.log("Server started at port 3000");
})
