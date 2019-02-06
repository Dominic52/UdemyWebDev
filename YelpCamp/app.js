var express = require("express");
var bodyparser = require("body-parser");
var mongoose = require("mongoose");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var Campground = require("./models/campground");
var Comment = require("./models/comment");
var User = require("./models/user");
var seedDB = require("./seeds");

var app = express();

// MongoDB connection
// Local host 
// mongoose.connect("mongodb://localhost:27017/yelp_camp", {useNewUrlParser: true});

// 
mongoose.connect("mongodb://dyan263:Cruiser-904@mdb1-shard-00-00-cwxrh.mongodb.net:27017,mdb1-shard-00-01-cwxrh.mongodb.net:27017,mdb1-shard-00-02-cwxrh.mongodb.net:27017/test?ssl=true&replicaSet=MDB1-shard-0&authSource=admin&retryWrites=true", {useNewUrlParser:true});
mongoose.set("useFindAndModify", false);

//Sets view engine to ejs. Allows references to ejs files to omit .ejs suffix
app.set("view engine", "ejs");

//Sets bodyparser to return URLencoded format
app.use(bodyparser.urlencoded({extended: true}));

//Links to CSS Stylesheets
app.use(express.static(__dirname + "/public"));

// Removes all campgrounds and creates new seed campground and comment data
seedDB();

//=====================================================================
//                     CAMPGROUND ROUTING STARTS HERE
//=====================================================================

// LANDING PAGE
app.get("/", function (req, res) {
    //Get routing for landing page
    res.render("landing");
});


// INDEX - GET webpage to display all campgrounds
app.get("/campgrounds", function (req, res) {
    //Get routing for campgrounds page
    //Gets all campgrounds from database
    Campground.find({}, function(err, allcampgrounds){
        if (err){
            console.log("SOMETHING WENT WRONG");
        } else {
            console.log("Here is a list of all campgrounds");
            res.render("campgrounds/index", {campgrounds: allcampgrounds});
        }
    });
});

// NEW - GET form page to submit new campground
app.get("/campgrounds/new", function(req, res){
    //New campground form page
    res.render("campgrounds/new");
});

// CREATE - POST sends new campsite information to database
app.post("/campgrounds", function(req, res) {
    //Post routing for new campgrounds
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.desc;
    var newCampground = {name: name, image: image, description: desc};
    //Creates new campground and saves to database
    Campground.create(newCampground, function(err, newlyCreated){
        if (err){
            console.log(err);
        } else {
            res.redirect("/campgrounds");
        }
    });
});

// SHOW - GET shows individual information about selected campground
app.get("/campgrounds/:id", function(req, res){
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if (err){
            console.log(err);
        } else {
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});

//=====================================================================
//                     COMMENT ROUTING STARTS HERE
//=====================================================================

// NEW comment form
app.get("/campgrounds/:id/comments/new", function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground){
        if (err) {
            console.log(err);
        } else {
            res.render("comments/new", {campground: foundCampground});
        }
    });
});

// CREATE new comment
app.post("/campgrounds/:id/comments", function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground){
        if (err){
            console.log(err);
        } else {
            Comment.create(req.body.comment, function(err, newComment){
                if (err){
                    console.log(err);
                } else {
                    foundCampground.comments.push(newComment);
                    foundCampground.save();
                    res.redirect("/campgrounds/" + req.params.id);
                }
            })
        }
    })
});



// Node server
app.listen(3000, function () {
    console.log("Yelp Camp server has started");
});