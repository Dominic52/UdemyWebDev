var p1button = document.getElementById("p1");
var p2button = document.getElementById("p2");
var reset = document.getElementById("reset");
var score1 = document.getElementById("p1score");
var score2 = document.getElementById("p2score");
var winscore = 5;
var winscoredisplay = document.getElementById("winscoredisplay");
var wincondition = document.getElementById("wincondition");
var player1score = 0;
var player2score = 0;

p1button.addEventListener("click", function(){
    player1score++
    score1.innerText = player1score;

    if (player1score == winscore) {
        score1.classList.add("winner");
        p1button.disabled = true;
        p2button.disabled = true;
    }

})

p2button.addEventListener("click", function(){
    player2score++
    score2.innerText = player2score;

    if (player2score == winscore) {
        score2.classList.add("winner");
        p1button.disabled = true;
        p2button.disabled = true;
    }
})

reset.addEventListener("click", function(){
    score1.innerHTML = 0;
    score2.innerHTML = 0;

    player1score = 0;
    player2score = 0;

    p1button.disabled = false;
    p2button.disabled = false;
    
    score1.classList.remove("winner")
    score2.classList.remove("winner")
})

wincondition.oninput = () => {
    winscore = wincondition.value;
    winscoredisplay.textContent = winscore;
    console.log(winscore)
}