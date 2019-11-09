// var artDiv = document.getElementById("articles");
// var mainDiv = document.getElementById("main");
// document.querySelector("#change2")
// document.getElementsByClassName("example");


document.addEventListener("DOMContentLoaded", function(event) {
    var startBtn = document.getElementById("startButton");

    var initCard = document.getElementById("initalCard");
    var questCard = document.getElementById("questionCard");
    var timerDisp = document.getElementById("timer");

    var timer = 75;
    

    startBtn.addEventListener("click", function() {
        initCard.style.display = "none";
        questCard.style.display = "block"
        beginGame();
      });

function beginGame() {

    interval = setInterval(function() {
        timer--;
        timerDisp.textContent = timer;
      }, 1000);


}


});