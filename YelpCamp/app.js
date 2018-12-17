var express = require("express");
var app = express();

app.set("view engine", "ejs");

app.get("/", function (req, res) {
    res.render("landing");
})

app.get("/campgrounds", function (req, res) {
    var campgrounds = [
        { name: "Salmon Creek", image: "https://farm4.staticflickr.com/3474/3723452014_69038c2ffa.jpg" },
        { name: "Owen G Glen Building", image: "https://farm1.staticflickr.com/119/274197774_42179734d0.jpg" },
        { name: "Joy Park", image: "https://farm5.staticflickr.com/4124/4972095496_e8c6be009d.jpg" }
    ]
    res.render("campgrounds", { campgrounds: campgrounds })
})

app.listen(3000, function () {
    console.log("Yelp Camp server has started");
})