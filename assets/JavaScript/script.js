
document.addEventListener("DOMContentLoaded", function (event) {
    var startBtn = document.getElementById("startButton");

    var initCard = document.getElementById("initalCard");
    var questCard = document.getElementById("questionCard");
    var timerDisp = document.getElementById("timer");
    var alert = document.getElementById("alert");
    var footer = document.getElementById("footer");
    var scoreLink = document.getElementById("scoreLink");
    var scoreCard = document.getElementById("scoreCard");
    var highScoreList = document.querySelector("#highScore-list");

    // var buttons = document.querySelectorAll(".btn")

    var questText = document.getElementById("questionPrompt");
    var answerBtns = document.getElementById("answerArea");
    var clearBtn = document.getElementById("clearBtn");
    var clearBtnArea = document.getElementById("clearBtnArea");


    var a = document.getElementById("AAnswer");
    var b = document.getElementById("BAnswer");
    var c = document.getElementById("CAnswer");
    var d = document.getElementById("DAnswer");

    var aBtn = document.getElementById("AAnswerBtn");
    var bBtn = document.getElementById("BAnswerBtn");
    var cBtn = document.getElementById("CAnswerBtn");
    var dBtn = document.getElementById("DAnswerBtn");

    var problemTime = 15;    //time per question
    var iter = 0;
    var timer = 75;
    var endTime = 0;
    var correct = 0;
    var wrong = 0;
    var user = "";
    var score = 0;
    var newQuestions = questions;
    var scoreList = [];
    var maxScore = 0;
    var scoreShown = false;

    /**
     * Randomize array element order in-place.
     * Using Durstenfeld shuffle algorithm.
     */
    function shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }

    function setQuestion(index) {
        questText.textContent = questions[index].title;
        let choiceArray = questions[index].choices
        choiceArray = shuffle(choiceArray)      //answers are shuffled

        a.textContent = choiceArray[0];
        b.textContent = choiceArray[1];
        c.textContent = choiceArray[2];
        d.textContent = choiceArray[3];
    }

    //adding listeners to buttons
    startBtn.addEventListener("click", function () {
        initCard.style.display = "none";
        questCard.style.display = "block";
        beginGame();
    });

    scoreLink.addEventListener("click", function (event) {
        event.preventDefault();
        if (scoreShown) {
            scoreShown = false;
            scoreCard.style.display = "none";        
        } else {
                scoreShown = true;  
                scoreCard.style.display = "block";     
            }
   scoreSet();
    });

    scoreCard.style.display = "none";  //defulat scores to hidden

    clearBtn.addEventListener("click", function (event) {
        event.preventDefault();
        clearScores();
    });

    var addBtns = document.getElementsByClassName("answerBtn");
    for (var i = 0; i < addBtns.length; i++) {
        // addBtns[i].removeEventListener("click",userChoice,false);
        addBtns[i].addEventListener("click", userChoice, false);

    }

    scoreSet();

    function userChoice(event) {
        let userAnswer = "";

        // event.preventDefault();
        // event.stopPropagation();
        userAnswer = event.target.nextElementSibling.textContent;
        // console.log(userAnswer);
        if (userAnswer === newQuestions[iter].answer) {
            console.log("win");
            console.log(iter);
            correct++;
            footer.textContent = "Right!"
        } else {
            console.log("lose");
            console.log(iter);
            timer -= 5; //5 seconds lost for wrong answer
            wrong++;
            footer.textContent = "Wrong!"
        }
        if (iter < (newQuestions.length - 1)) {
            iter++;
            setQuestion(iter);
        } else if (iter === (newQuestions.length - 1)) {
            iter++;
        }

    }

function scoreSet() {
    scoreList = JSON.parse(localStorage.getItem("scores") || "[]");
    highScoreList.innerHTML = "";  
    console.log(scoreList);

    scoreList.sort(function(a, b) {  //sort scores descending
        return parseInt(b.score) - parseInt(a.score);  //simple sort function, if positive, sorts higher, negative, sorts lower
    });
    console.log(scoreList);

    if ( scoreList.length === 0) {
        clearBtnArea.style.display = "none";
        alert.textContent = "Se how well you can do!";
    } else {
        clearBtnArea.style.display = "block";
        maxScore = scoreList[0].score; //current high score
    alert.textContent = "Previous high score: " + maxScore;
    }

    

    for (let j = 0; j < scoreList.length; j++) {
      var scoreDisp = scoreList[j].user + ": " + scoreList[j].score;
  
      var li = document.createElement("li");
      li.textContent = scoreDisp;  
      highScoreList.appendChild(li);
    }


}

function clearScores() {
    scoreList = [];
    localStorage.setItem("scores", JSON.stringify(scoreList));
    scoreSet();

}

    function endGame() {
        clearInterval(interval);
        endTime = timer;
        timer = 0;
        timerDisp.textContent = timer;
        console.log("wins " + correct + ", Losses " + wrong + ", " + endTime);
        initCard.style.display = "block";
        questCard.style.display = "none";

        let highscore = (correct * problemTime + endTime);
        let userInput = prompt(`Your score is ${correct * problemTime + endTime}. Enter your initials:`);

        scoreList = JSON.parse(localStorage.getItem("scores") || "[]");
        scoreList.push({score: highscore, user: userInput});

        localStorage.setItem("scores", JSON.stringify(scoreList));
        scoreSet();

    }


    function beginGame() {
        correct = 0;
        wrong = 0;
        iter = 0;
        timer = questions.length * problemTime;  //sets initial timer length



        newQuestions = shuffle(newQuestions);   //randomly arranges questions

        setQuestion(iter);

        interval = setInterval(function () {   //initializes timer

            timerDisp.textContent = timer;
            timer--;

            if (timer < 0) {
                endGame();

            } else if (iter >= newQuestions.length) {
                endGame();
            }


        }, 1000);

    }


});

