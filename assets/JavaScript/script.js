
document.addEventListener("DOMContentLoaded", function (event) {  //waits for page load
    //DOM targeting elements
    var startBtn = document.getElementById("startButton");

    var initCard = document.getElementById("initalCard");
    var questCard = document.getElementById("questionCard");
    var timerDisp = document.getElementById("timer");
    var alert = document.getElementById("alert");
    var footer = document.getElementById("footer");
    var scoreLink = document.getElementById("scoreLink");
    var scoreCard = document.getElementById("scoreCard");
    var highScoreList = document.querySelector("#highScore-list");
    var instructions = document.getElementById("instructions");


    var questText = document.getElementById("questionPrompt");
    // var answerBtns = document.getElementById("answerArea");
    var clearBtn = document.getElementById("clearBtn");
    var clearBtnArea = document.getElementById("clearBtnArea");

    //Answer texts
    var a = document.getElementById("AAnswer");
    var b = document.getElementById("BAnswer");
    var c = document.getElementById("CAnswer");
    var d = document.getElementById("DAnswer");
    //Answer buttons
    var aBtn = document.getElementById("AAnswerBtn");
    var bBtn = document.getElementById("BAnswerBtn");
    var cBtn = document.getElementById("CAnswerBtn");
    var dBtn = document.getElementById("DAnswerBtn");

    //variable stack - noramlly wouldn't use globals but it's a small application (and I'm novice)
    var problemTime = 10;    //time per question and points factor
    var penalty = 5;        //time penalty for a wrong answer
    //Modify the above to change the quiz dynamics
    
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

    //dynamic instructions based upon quiz dynamics
    instructions.textContent = ("Your score is the number of correct answers times "+problemTime+", plus the time remaining. Careful - wrong answers will also subtract "+penalty+" seconds from the time remaining!");


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

    //resets card content to the next questions
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

    //toggle for score list
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

    //clear for saved scores
    clearBtn.addEventListener("click", function (event) {
        event.preventDefault();
        clearScores();
    });

    //assigns listeners to answer buttons
    var addBtns = document.getElementsByClassName("answerBtn");
    for (var i = 0; i < addBtns.length; i++) {
        // addBtns[i].removeEventListener("click",userChoice,false);
        addBtns[i].addEventListener("click", userChoice, false);

    }

    //runs initial scoreSet in case there is saved data
    scoreSet();

    //when the user selects an answer this checks if it's correct
    function userChoice(event) {
        event.preventDefault();

        let userAnswer = "";
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
            timer -= penalty; //5 seconds (or penalty) lost for wrong answer
            wrong++;
            if (wrong > 1) {
                questCard.classList.remove("shake");
                void questCard.offsetWidth;  //animation restart fix
                questCard.classList.add("shake");

            } else { questCard.classList.add("shake"); }
            footer.textContent = "Wrong!"
        }
        if (iter < (newQuestions.length - 1)) {
            iter++;
            setQuestion(iter);
        } else if (iter === (newQuestions.length - 1)) {  //fix to add counter to kick out of game but not reset question to undefined
            iter++;
        }

    }

    //builds scorecard 
    function scoreSet() {
        scoreList = JSON.parse(localStorage.getItem("scores") || "[]");
        highScoreList.innerHTML = "";
        console.log(scoreList);

        scoreList.sort(function (a, b) {  //sort scores descending
            return parseInt(b.score) - parseInt(a.score);  //simple sort function, if positive, sorts higher, negative, sorts lower
        });
        console.log(scoreList);

        if (scoreList.length === 0) {  //checks if there are stored values
            clearBtnArea.style.display = "none";
            alert.textContent = "See how well you can do!";
        } else {
            clearBtnArea.style.display = "block";
            maxScore = scoreList[0].score; //current high score
            alert.textContent = "Previous high score: " + maxScore;
        }
        //builds score list
        for (let j = 0; j < scoreList.length; j++) {
            var scoreDisp = scoreList[j].user + ": " + scoreList[j].score;

            var li = document.createElement("li");
            li.textContent = scoreDisp;
            highScoreList.appendChild(li);
        }
    }

        //clears saved scores and storage
    function clearScores() {
        scoreList = [];
        localStorage.setItem("scores", JSON.stringify(scoreList));
        scoreSet();

    }

    //ends the run of the game, caclulates and stores score
    function endGame() {
        clearInterval(interval);
        endTime = timer;
        timer = 0;
        timerDisp.textContent = timer;
        console.log("wins " + correct + ", Losses " + wrong + ", " + endTime);
        initCard.style.display = "block";
        questCard.style.display = "none";

        let highscore = (correct * problemTime + endTime);  //score formula
        let userInput = prompt(`Your score is ${correct * problemTime + endTime}. Enter your initials:`);  //given more time, I wouldn't use a prompt
        if (userInput === null) {  //prevents saving nulls if no user input
            userInput = "???";
        }
        scoreList = JSON.parse(localStorage.getItem("scores") || "[]");
        scoreList.push({ score: highscore, user: userInput });

        localStorage.setItem("scores", JSON.stringify(scoreList));
        scoreSet();

        footer.textContent = "Going to better your score..?";  //get sassy on a repeat
    }

 // starts the game, initializes counters and intervals and prompts user
    function beginGame() {
        correct = 0;
        wrong = 0;
        iter = 0;
        timer = questions.length * problemTime;  //sets initial timer length

        questCard.classList.remove("shake");  //initializes animation styles
        void questCard.offsetWidth;  //animation restart fix

        newQuestions = shuffle(newQuestions);   //randomly arranges questions

        setQuestion(iter);

        interval = setInterval(function () {   //initializes timer

            timerDisp.textContent = timer;
            timer--;

            if (timer < 0) {  //ends game if time runs out
                endGame();

            } else if (iter >= newQuestions.length) {   //ends game if questions run out
                endGame();
            }


        }, 1000);

    }


});

// ;) hi there!
