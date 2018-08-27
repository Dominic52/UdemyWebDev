var express = require("express");
var bodyParser = require("body-parser");
var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

app.get("/", function(req, res){
    res.render("home");
});

app.get("/friends", function(req, res){
    var friends =["Tony", "Miranda", "Justin"];
    res.render("friends", {friends: friends});
});

app.post("/addfriend", function(req, res){
    res.send("You have reached the post route");
    console.log(req.body);
})
app.listen(3000, function(){
    console.log("Server Started");
});