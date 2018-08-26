var exp = require("express");
var app = exp();

app.get("/speak/:animal", function(req, res){
    var aninoise;
    switch (req.params.animal) {
        case "pig":
            aninoise = "Oink";
            break;
        case "cow":
            aninoise = "Moo";
            break;
        case "dog":
            aninoise = "Woof";
            break;
        default:
            break;
    }
    res.send(aninoise);
})
app.get("/repeat/:str/:num", function(req, res){
    var str = req.params.str;
    var num = Number(req.params.num);
    var prnt = "";

    for(var i = 0; i < num; i++){
        prnt = prnt + " " + str;
    }

    res.send(prnt);
})
app.get("*", function(req, res){
    res.send("Nothing here, what are you doing with your life??");
})
app.listen(3000, function(){
    console.log("Server has started");
});