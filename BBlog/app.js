var express = require("express");
var mongoose = require("mongoose");
var bodyparser = require("body-parser");

var app = express();

mongoose.connect("mongodb://localhost:27017/blog_app", {useNewUrlParser: true});

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended: true}));

// MongoDB config

var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    date: {type: Date, default: Date.now}
});

var blog = mongoose.model("Blog", blogSchema);

// blog.create({
//     title: "Test Blog Post",
//     image: "https://images.unsplash.com/photo-1545263869-e8845b82f4df?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
//     body: "This is a piping hot new test blog post"

// })

app.get()


app.listen(3000, function(){
    console.log("BBlog server has started");
});