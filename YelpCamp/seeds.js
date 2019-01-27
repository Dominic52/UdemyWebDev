var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");


var data = [
    {name: "Billy's Hill",
    image: "https://c2.staticflickr.com/2/1086/882244782_d067df2717_b.jpg",
    description: "Hill Billys' Hill of Billys"
    },
    {name: "Hunua Ranges",
    image: "https://c1.staticflickr.com/5/4894/39867788013_35e7253b83_b.jpg",
    description: "A wide range of Hunuas"
    },
    {name: "Waitakere Ranges",
    image: "https://c1.staticflickr.com/1/31/46342409_4a18b13b26_b.jpg",
    description: "The good ol' Waitaks"
    }
]


function seedDB(){
    // Removes all campgrounds
    Campground.remove({}, function(err){
        if (err){
            console.log(err);
        } else {
            console.log("removed all campgrounds!");
            // Creates new default campgrounds
            data.forEach(function(seed){
                Campground.create(seed, function(err, campground){
                    if(err){
                        console.log(err);
                    } else {
                        console.log("added default data");
                        Comment.create(
                            {
                                text: "This is a very nice place to go to",
                                author: "Gary Oaks"
                            }, function(err, comment){
                                if (err){
                                    console.log(err);
                                } else {
                                    campground.comments.push(comment);
                                    campground.save();
                                    console.log("added new default comment");
                                }
                            });
                    }
                });
            });
        }
    });

    

}

module.exports = seedDB;