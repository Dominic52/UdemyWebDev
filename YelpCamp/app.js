var express = require("express");
var bodyparser = require("body-parser");

var app = express();



app.set("view engine", "ejs");
//Sets view engine to ejs. Allows references to ejs files to omit .ejs suffix
app.use(bodyparser.urlencoded({extended: true}));



app.get("/", function (req, res) {
    //Get routing for landing page
    res.render("landing");
})

var campgrounds = [
    //Temporary dummy campgrounds data
    { name: "Salmon Creek", image: "https://farm4.staticflickr.com/3474/3723452014_69038c2ffa.jpg" },
    { name: "Owen G Glen Building", image: "https://farm1.staticflickr.com/119/274197774_42179734d0.jpg" },
    { name: "Joy Park", image: "https://farm5.staticflickr.com/4124/4972095496_e8c6be009d.jpg" },
    { name: "Salmon Creek", image: "https://farm4.staticflickr.com/3474/3723452014_69038c2ffa.jpg" },
    { name: "Owen G Glen Building", image: "https://farm1.staticflickr.com/119/274197774_42179734d0.jpg" },
    { name: "Joy Park", image: "https://farm5.staticflickr.com/4124/4972095496_e8c6be009d.jpg" },
    { name: "Salmon Creek", image: "https://farm4.staticflickr.com/3474/3723452014_69038c2ffa.jpg" },
    { name: "Owen G Glen Building", image: "https://farm1.staticflickr.com/119/274197774_42179734d0.jpg" },
    { name: "Joy Park", image: "https://farm5.staticflickr.com/4124/4972095496_e8c6be009d.jpg" },
    { name: "Salmon Creek", image: "https://farm4.staticflickr.com/3474/3723452014_69038c2ffa.jpg" },
    { name: "Owen G Glen Building", image: "https://farm1.staticflickr.com/119/274197774_42179734d0.jpg" },
    { name: "Joy Park", image: "https://farm5.staticflickr.com/4124/4972095496_e8c6be009d.jpg" }
]

app.get("/campgrounds", function (req, res) {
    //Get routing for campgrounds page
    
    res.render("campgrounds", { campgrounds: campgrounds })
})

app.post("/campgrounds", function(req, res) {
    //Post routing for new campgrounds
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name: name, image: image};
    campgrounds.push(newCampground);
    res.redirect("/campgrounds");
})

app.get("/campgrounds/new", function(req, res){
    //New campground form page
    res.render("new");
})

app.listen(3000, function () {
    console.log("Yelp Camp server has started");
})