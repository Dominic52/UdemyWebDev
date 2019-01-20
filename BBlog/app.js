var express = require("express");
var mongoose = require("mongoose");
var bodyparser = require("body-parser");
var methodOverride = require("method-override");
var expressSanitizer = require("express-sanitizer");

var app = express();

mongoose.connect("mongodb://localhost:27017/blog_app", {useNewUrlParser: true});
mongoose.set("useFindAndModify", false);

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(expressSanitizer());

// MongoDB config

var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now}
});

var blog = mongoose.model("Blog", blogSchema);

// blog.create({
//     title: "Test Blog Post",
//     image: "https://images.unsplash.com/photo-1545263869-e8845b82f4df?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
//     body: "This is a piping hot new test blog post"

// })

// INDEX Route
app.get("/", function(req, res){
    res.redirect("/blogs");
});

app.get("/blogs", function(req, res){
    blog.find({}, function(err, blogs){
        if (err){
            console.log("ERROR");
        } else{
            res.render("index", {blogs: blogs});
        }
    });
});

// NEW Route
app.get("/blogs/new", function(req, res){
    res.render("new");
});

// CREATE Route
app.post("/blogs", function(req, res){
    req.body.blog.body = req.sanitize(req.body.blog.body);
    blog.create(req.body.blog, function(err, newBlog){
        if (err){
            console.log("Error creating blog post");
            res.render("new");
        } else {
            res.redirect("/blogs");
        }
    });
});

// SHOW Route
app.get("/blogs/:id", function(req, res){
    blog.findById(req.params.id, function(err, foundBlog){
        if (err){
            res.redirect("/");
        } else {
            res.render("show", {blog: foundBlog});
        }
    });
});

// EDIT Route
app.get("/blogs/:id/edit", function(req, res){
    blog.findById(req.params.id, function(err, foundBlog){
        if (err){
            console.log("there was an error reaching post to be edited");
            res.redirect("/");
        } else {
            res.render("edit", {blog: foundBlog});
        }
    });
});

// UPDATE Route
app.put("/blogs/:id", function(req, res){
    req.body.blog.body = req.sanitize(req.body.blog.body);
    blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
        if (err){
            res.redirect("/");
        } else {
            res.redirect("/blogs/" + req.params.id);
        }
    });
});

// DELETE Route
app.delete("/blogs/:id", function(req, res){
    blog.findByIdAndRemove(req.params.id, function(err){
        if (err){
            res.redirect("/blogs");
        } else {
            res.redirect("/blogs");
        }
    });
});

// Listens to node server
app.listen(3000, function(){
    console.log("BBlog server has started");
});