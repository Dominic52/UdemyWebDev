//Initialise all variables
var header = document.getElementsByTagName("h1")[0];
var colorDisplay = document.getElementById("colorDisplay");
var newGame = document.getElementById("newGame");
var stat = document.getElementById("correct");
var modes = document.querySelectorAll(".mode");
var squares = document.querySelectorAll(".square");
var colors = [
  "rgb(255, 0, 0)",
  "rgb(255, 0, 0)",
  "rgb(255, 0, 0)",
  "rgb(255, 0, 0)",
  "rgb(255, 0, 0)",
  "rgb(255, 0, 0)"
];
var goal;
var goalnum;
var numSquares = 6;

init();

//Initializes game
function init() {
  buttonListeners();
}

//Initializes button listeners
function buttonListeners() {
  for (var i = 0; i < modes.length; i++) {
    modes[i].addEventListener("click", function() {
      modes[0].classList.remove("selected");
      modes[1].classList.remove("selected");
      this.classList.add("selected");
      if (this.textContent === "Easy") {
        numSquares = 3;
        console.log("3");
        modes[1].removeAttribute("disabled");
        modes[0].setAttribute("disabled", true);
      } else {
        numSquares = 6;
        console.log("6");
        modes[0].removeAttribute("disabled");
        modes[1].setAttribute("disabled", true);
      }
      changeSquares(numSquares);
    });
  }

  newGame.addEventListener("click", function() {
    console.log("Game Starts!");
  });
}

//Prepares squares with event listeners, colors, and a goal color
function squarePrep() {
  for (var i = 0; i < squares.length; i++) {
    var newRandomColor = randomColor();

    squares[i].style.backgroundColor = newRandomColor;
    squares[i].style.cursor = "pointer";

    //Randomly picks the correct color from generated colors
    goalnum = randomGoal(numSquares);

    if (i === goalnum) {
      goal = newRandomColor;
    }

    //Adds on click functions to each square
    squares[i].addEventListener("click", function() {
      if (this.style.backgroundColor === goal) {
        stat.textContent = "Correct!";
        changeColors(goal);
        header.style.backgroundColor = goal;
        newGame.textContent = "Play Again?";
      } else {
        stat.textContent = "Try Again!";
        this.style.backgroundColor = "#232323";
      }
    });
  }
  colorDisplay.textContent = goal;
}

//Generates a random color in rgb format
function randomColor() {
  var r = Math.floor(Math.random() * 256);
  var g = Math.floor(Math.random() * 256);
  var b = Math.floor(Math.random() * 256);
  return "rgb(" + r + ", " + g + ", " + b + ")";
}

//Generates a random goal color
function randomGoal(num) {
  return Math.floor(Math.random() * num);
}

//Changes number of displayed squares
function changeSquares(n) {
  for (var i = 3; i < squares.length; i++) {
    if (n === 3) {
      squares[i].setAttribute("style", "display:none");
    } else {
      squares[i].setAttribute("style", "display:inline-block");
    }
  }
}
