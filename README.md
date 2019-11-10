# ANZ-Code-Quiz
JHU Full Stack Bootcamp homework #4 - creating a JavaScript Quiz, with, JavaScript
# A JavaScript application that teaches the user (and developer!) JavaScript

This is a basic web-app designed to test the user's knowledge of JavaScript, while giving the developer practice with concepts in JS including HTML manipulation, events, linking functions, and objects.

# Design Notes

Building this was a challenege for the juinior (at this stage) developer, as it applies a number of new concepts and integrations in order to build a fully-fledged web application. As per the specification, there were rules to implement including loosing time when a question is answered incorrectly. Additionally, scores are logged with local storage to retain high scores. JQuery was not allowed, but Bootstrap was used to simplify design. The bonus objectives were to customize the theme, have multiple quizzes, and audio files corresponding to correct and incorrect answers. The developer opted to use an animation for incorrect answers and build a single quiz, but randomly sort the questions and answers so the quiz will be different each time. 

## Viewing and using the website

Github Pages link: (https://anzook.github.io/ANZ-Code-Quiz/)
![Mainpage Screenshot Demo](https://github.com/anzook/ANZ-Code-Quiz/blob/master/assets/Images/CodeQuizSS.png)

Scoring is caluclated as: (number of questions correct) X ([const]time set per question) + (time remaining)

The 'High Scores' button toggles the display card of scores.

All website assets are contained within the repo (https://github.com/anzook/ANZ-Code-Quiz)

Pages include:
* JavaScript Quiz (index.html and framework)

* script.js (main code)
* questions.js (array of objects with questions in set format)

* style.css (basic modifications and animations on top of Bootstrap)

## Contributing

Please feel free to improve, fix, or simply add questions to the question.js files! Add your own question bank and design a custom quiz to your needs.

## Acknowledgements and Credits

Website created as an assignment for the Johns Hopkins full-stack web development bootcamp (in partnership with Trilogy Education Services).
Guidance and assistance provided by:
* Stetson Lewis (Instructor)
* Donald Hesler (TA)
