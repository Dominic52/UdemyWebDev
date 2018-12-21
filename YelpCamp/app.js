var express = require("express");
var bodyparser = require("body-parser");
var mongoose = require("mongoose");

var app = express();

//MongoDB connection
mongoose.connect("mongodb://localhost:27017/yelp_camp", {useNewUrlParser: true});


//Sets view engine to ejs. Allows references to ejs files to omit .ejs suffix
app.set("view engine", "ejs");

//Sets bodyparser to return URLencoded format
app.use(bodyparser.urlencoded({extended: true}));


//Database Schema
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

// Test creates new campground object to be saved to database

// Campground.create(
//     { name: "Owen G Glen Building", image: "https://farm1.staticflickr.com/119/274197774_42179734d0.jpg", description: "You can find John Hood Plaza here among many sweaty UOA business students" }, function(err, campground){
//         if (err){
//             console.log("SOMETHING WENT WRONG");
//         } else {
//             console.log("CAMPGROUND ADDED TO DB");
//         }
//     }
// );


////////// ROUTING STARTS HERE ////////////

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
            res.render("index", {campgrounds: allcampgrounds});
        }
    });
});

// NEW - GET form page to submit new campground

app.get("/campgrounds/new", function(req, res){
    //New campground form page
    res.render("new");
});

// CREATE - POST sends new campsite information to database

app.post("/campgrounds", function(req, res) {
    //Post routing for new campgrounds
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name: name, image: image};
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
    Campground.findById(req.params.id, function(err, foundCampground){
        if (err){
            console.log(err);
        } else {
            res.render("show", foundCampground);
        }
    });
});


// Node server 
app.listen(3000, function () {
    console.log("Yelp Camp server has started");
});