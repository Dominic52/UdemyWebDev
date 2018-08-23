var colors = [
  "rgb(255, 0, 0)",
  "rgb(255, 0, 0)",
  "rgb(255, 0, 0)",
  "rgb(255, 0, 0)",
  "rgb(255, 0, 0)",
  "rgb(255, 0, 0)"
];

var squares = document.querySelectorAll(".square");
var goal;
var goalnum = Math.floor(Math.random() * 6);

for (var i = 0; i < squares.length; i++) {
  var r = Math.floor(Math.random() * 256);
  var g = Math.floor(Math.random() * 256);
  var b = Math.floor(Math.random() * 256);
  var randC = "rgb(" + r + ", " + g + ", " + b + ")";
  squares[i].style.backgroundColor = randC;
  if (i === goalnum) {
    goal = randC;
  }
  squares[i].addEventListener("click", function() {
    if (this.style.backgroundColor === goal) {
      document.getElementById("correct").textContent = "Correct!";
    } else document.getElementById("correct").textContent = "Try Again!";
  });
}

var colorDisplay = document.getElementById("colorDisplay");

colorDisplay.textContent = goal;

document.getElementsByTagName("h1")[0].style.backgroundColor = goal;
