// var artDiv = document.getElementById("articles");
// var mainDiv = document.getElementById("main");
// document.querySelector("#change2")
// document.getElementsByClassName("example");


document.addEventListener("DOMContentLoaded", function (event) {
    var startBtn = document.getElementById("startButton");

    var initCard = document.getElementById("initalCard");
    var questCard = document.getElementById("questionCard");
    var timerDisp = document.getElementById("timer");

    var questText = document.getElementById("questionPrompt");


    var a = document.getElementById("AAnswer");
    var b = document.getElementById("BAnswer");
    var c = document.getElementById("CAnswer");
    var d = document.getElementById("DAnswer");

    var aBtn = document.getElementById("AAnswerBtn");
    var bBtn = document.getElementById("BAnswerBtn");
    var cBtn = document.getElementById("CAnswerBtn");
    var dBtn = document.getElementById("DAnswerBtn");

    var timer = 75;


    startBtn.addEventListener("click", function () {
        initCard.style.display = "none";
        questCard.style.display = "block"
        beginGame();
    });

    function beginGame() {

        interval = setInterval(function () {
            timer--;
            timerDisp.textContent = timer;
        }, 1000);

        let query = "";

        query = questions[0].title;
        questText.textContent = query;

        a.textContent = questions[0].choices[0];
        b.textContent = questions[0].choices[1];
        c.textContent = questions[0].choices[2];
        d.textContent = questions[0].choices[3];
    }


});