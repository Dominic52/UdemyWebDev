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
var inGame = false;

//Scores logged in console
var correctCount = 0;
var guessCount = 0;


//Basically the init function
buttonListeners();

//Initializes button listeners
function buttonListeners() {
  for (var i = 0; i < modes.length; i++) {
    modes[i].style.cursor = "pointer";
    modes[i].addEventListener("click", function() {
      if (!inGame) {
        modes[0].classList.remove("selected");
        modes[1].classList.remove("selected");
        this.classList.add("selected");
        if (this.textContent === "Easy") {
          numSquares = 3;
          console.log("Easy Mode");
          modes[1].removeAttribute("disabled");
          modes[0].setAttribute("disabled", true);
        } else {
          numSquares = 6;
          console.log("Hard Mode");
          modes[0].removeAttribute("disabled");
          modes[1].setAttribute("disabled", true);
        }
        changeSquares(numSquares);
      }
    });
  }

  newGame.style.cursor = "pointer";
  newGame.addEventListener("click", function() {
    console.log("Game Start!");
    runGame();
  });
}

//Prepares squares with event listeners, colors, and a goal color
function runGame() {
  inGame = true;
  //Randomly picks the correct color from generated colors
  goalnum = randomGoal(numSquares);

  //For each square
  for (var i = 0; i < squares.length; i++) {
    //Generate a random color
    var newRandomColor = randomColor();
    //Sets individual square to random color
    squares[i].style.backgroundColor = newRandomColor;
    //Sets squares to have "pointer" style cursor
    squares[i].style.cursor = "pointer";
    //Sets randomized goal square
    if (i === goalnum) {
      goal = newRandomColor;
    }
    //Adds on click functions to each square
    squares[i].addEventListener("click", function() {
      //If clicked square is goal case
      if (this.style.backgroundColor === goal) {
        if (inGame){  
          correctCount++;
          console.log(correctCount + " answered correctly of " + guessCount + " total guesses!")
        }
        stat.textContent = "Correct!";
        changeToGoalColors(goal);
        header.style.backgroundColor = goal;
        newGame.textContent = "Play Again?";
        inGame = false;
      } else {
      if (inGame){ 
        guessCount++;
      }
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
      squares[i].style.backgroundColor = goal;
    }
  }
}

//Changes all squares to correct goal color
function changeToGoalColors(color) {
  squares.forEach((square) => {
    square.style.backgroundColor = goal;
  })
}