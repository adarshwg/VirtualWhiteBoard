const express= require("express");
const bodyParser= require("body-parser");
const https= require("https");

const app= new express();
app.use(express.static("public"));
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


app.listen(3000,function(){
    console.log("Server started at port 3000");
})

