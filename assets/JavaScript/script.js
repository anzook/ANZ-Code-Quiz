
document.addEventListener("DOMContentLoaded", function (event) {
    var startBtn = document.getElementById("startButton");

    var initCard = document.getElementById("initalCard");
    var questCard = document.getElementById("questionCard");
    var timerDisp = document.getElementById("timer");
    var alert = document.getElementById("alert");
    // var buttons = document.querySelectorAll(".btn")

    var questText = document.getElementById("questionPrompt");
    var answerBtns = document.getElementById("answerArea");


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


    startBtn.addEventListener("click", function () {
        initCard.style.display = "none";
        questCard.style.display = "block";
        beginGame();
    });

    function endGame() {
        clearInterval(interval);
        endTime = timer;
        timer = 0;
        timerDisp.textContent = timer;
        console.log("wins " + correct + ", Losses " + wrong + ", " + endTime);
        initCard.style.display = "block";
        questCard.style.display = "none";
    var highscore = {
        score: (correct * problemTime + endTime),
    user: prompt(`Your score is ${correct * problemTime + endTime}. Enter your initials:`)  
    }

}


    function beginGame() {
        correct = 0;
        wrong = 0;
        iter = 0;
        timer = questions.length * problemTime;  //sets initial timer length


        let newQuestions = questions;
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


        answerBtns.addEventListener("click", function (event) {
            event.preventDefault();
            event.stopPropagation();
            if (event.target.matches(".btn")) {
                let userAnswer = event.target.nextElementSibling.textContent;
                // console.log(userAnswer);
                if (userAnswer === newQuestions[iter].answer) {
                    console.log("win");
                    console.log(iter);
                    correct++;
                } else {
                    console.log("lose");
                    console.log(iter);
                    timer -= 5; //5 seconds lost for wrong answer
                    wrong++;
                }
                if (iter < (newQuestions.length - 1)) {
                    iter++;
                    setQuestion(iter);
                } else if (iter === (newQuestions.length - 1)) {
                    iter++;
                }
            }

        });


    }


});

