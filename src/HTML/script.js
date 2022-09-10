/* code quiz
    1)when the user visits the site, the page will display the title and a description as well as a highscore link on the top
        as wel as a button to start the quiz
        need a link to high score page on the top left and a timer on the top right
    2) when the user pushes the button, the page will populate with a question and the timer will begin
        page has 4 answer buttons that appear to be ordered lists
    3) correct answer stores points, wrong answer subtracts time from clock
        TODO: FIXME: fix for loop (right now the loop goes to the last question in the questions array instead of the first)
    4) when all questions are answered or timer == 0, game is over.
    5) user can enter initials and save score for later viewing */

// VARIABLES

// variable to populate h2
var headerEl = document.getElementById('header');
// variable to populate answers and text
var textEl = document.getElementById('text');
// variable for unhiding buttons
var hideEl = document.querySelector('.hide');
// start button
var startButtonEl = document.getElementById('start-button');
// variable for timer on page
var timerEl = document.querySelector('.timer');
// make an ordered list for questions to populate
var aList = document.createElement('ol');
// area to print result
var result = document.getElementById('result')
    // make the answer buttons
var answerButton1 = document.createElement('button');
var answerButton2 = document.createElement('button');
var answerButton3 = document.createElement('button');
var answerButton4 = document.createElement('button');
answerButton1.classList.add('answer-button', 'a');
answerButton2.classList.add('answer-button', 'b');
answerButton3.classList.add('answer-button', 'c');
answerButton4.classList.add('answer-button', 'd');
// variable to store number of correct answers aka user's score
var score = 0;
// variable to set initial timer
let secondsRemaning = 75;
// timer variable
var timerInterval;
// questions
var questions = [{
        question: 'What do you need to make a string in JavaScript?',
        answers: {
            a: '< >',
            b: '" "',
            c: '( )',
            d: '{ }'
        },
        correctAnswer: 'b'
    },
    {
        question: 'Which of these is a complex data type in JavaScript?',
        answers: {
            a: 'function',
            b: 'boolean',
            c: 'number',
            d: 'string'
        },
        correctAnswer: 'a'
    },
    {
        question: 'Which of these can NOT be used to set a variable in JavaScript?',
        answers: {
            a: 'var',
            b: 'const',
            c: 'is',
            d: 'let'
        },
        correctAnswer: 'c'
    },
    {
        question: 'What character is used to select an id in CSS?',
        answers: {
            a: '.',
            b: '#',
            c: '!',
            d: '&'
        },
        correctAnswer: 'b'
    },
    {
        question: 'What are the three fundemental languages of the modern web?',
        answers: {
            a: 'Java, Python, PHP',
            b: 'Ruby, GO, Rust',
            c: 'C, C#, C++',
            d: 'HTML, CSS, JavaScript'
        },
        correctAnswer: 'd'
    },
    {
        question: 'What tool is best for debugging?',
        answers: {
            a: 'Array.map()',
            b: 'window.close()',
            c: 'console.log()',
            d: 'hammer'
        },
        correctAnswer: 'c'
    },
    {
        question: 'What does CSS stand for?',
        answers: {
            a: 'Cascading Style Sheets ',
            b: 'Collating Syrup Sleds',
            c: 'Canberra Secret Service',
            d: 'Cresent Swiss Sammies'
        },
        correctAnswer: 'a'
    },
    {
        question: 'Name the responsive CSS famework developed at Twitter',
        answers: {
            a: 'Shoestrap ',
            b: 'CSS For Less',
            c: 'Bootstrap',
            d: 'Nester'
        },
        correctAnswer: 'c'
    }
];
// current question array
var currentQuestion;
var questionArray = [];
var i = 0;
// object to store initials and scores to local data
var scoreObjs = JSON.parse(localStorage.getItem('scoreObj')) || [];

// FUNCTIONS

// game over, enter initials to store high score TODO:
function enterScore() {
    // clear timer
    clearInterval(timerInterval);
    timerEl.textContent = '';
    console.log('GAME OVER');
    // print 'Game Over!'
    headerEl.textContent = 'Game Over!';
    // print the score to the page
    divEl = document.createElement('div');
    scoreEl = document.createElement('score');
    scoreEl.textContent = `Final Score: ${score}`;
    headerEl.appendChild(divEl);
    divEl.appendChild(scoreEl);
    // create input box
    var form = document.createElement('form');
    var inputBox = document.createElement('input');
    // input box attributes
    inputBox.setAttribute('type', 'text');
    inputBox.setAttribute('placeholder', 'Enter Initials');
    // render input box to screen
    aList.replaceWith(form);
    form.appendChild(inputBox);

    // store the initials and go to high scores page
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        // object that holds initials and scores
        var object = {
                name: inputBox.value,
                score: score
            }
            // push the object into the local storage
        scoreObjs.push(object)
        localStorage.setItem('scoreObj', JSON.stringify(scoreObjs));
        // open the scores.html page if initials are not blank
        if (inputBox.value != '') {
            window.open('scores.html', '_self');
        };
    });
};

// timer
function timer() {
    timerInterval = setInterval(function() {
        // decrement seconds left
        secondsRemaning--;
        // render seconds remaing to page
        timerEl.textContent = 'Timer: ' + secondsRemaning;
        // console.log(secondsRemaning)
        // console.log('WORKING')
        // if the user gets a question wrong, decrease the amount of seconds remaining by some amount
        // if (questions.answer == false) {
        //     // render 'Wrong' to the page
        //     //decrease amount of seconds remaining

        //     //if secondsRemaining == 0, stop the game and clear the timer
        if (secondsRemaning == 0) {
            //     clearInterval(timerInterval);
            clearInterval(timerInterval);
            timerEl.textContent = 'Timer: ' + secondsRemaning;
            enterScore();
        }
    }, 1000);
};

// question generator/ game start
function gamestart() {
    // hide start button
    startButtonEl.classList.add('hide');
    //start timer
    timer();

    // shuffle the question order
    questions.sort(() => Math.random() - 0.5);
    console.log('QUESTIONS: ', questions)
        // store the current question
    currentQuestion = questions[i];

    // ask a question
    questionAsker();
};

// populate the page with a question
questionAsker = () => {
    if (questionArray.length >= questions.length || secondsRemaning == 0) {
        enterScore();
    } else {
        // append the list to be populated to the textEl
        textEl.replaceWith(aList);

        // store current question
        currentQuestion = questions[i];
        // store questions into an array to check when there are no more questions to ask
        questionArray.push(questions[i]);
        // render the question to the page
        headerEl.innerHTML = questions[i].question;
        // set each list item texto to the answer's text
        answerButton1.innerHTML = questions[i].answers.a;
        answerButton2.innerHTML = questions[i].answers.b;
        answerButton3.innerHTML = questions[i].answers.c;
        answerButton4.innerHTML = questions[i].answers.d;
        //render each answer to the list
        aList.appendChild(answerButton1);
        aList.appendChild(answerButton2);
        aList.appendChild(answerButton3);
        aList.appendChild(answerButton4);
        console.log('value of i: ', i);
        console.log('CURRENT Q: ', currentQuestion);
    };
};


//EVENT LISTENERS

// on page load, populate start button and quiz info
addEventListener('load', () => {
    // if the header element exists on the page...
    if (headerEl) {
        // ...populate header
        headerEl.textContent = 'Welcome to the quiz'
    };
    // if text element exists on the page...
    if (textEl) {
        // ...populate the rules text
        textEl.innerHTML = 'You have 75 seconds for the quiz. Each wrong answer will decrease your time by 10 seconds. Correct answers will increase your score by one. At the end of the quiz, you may input your initials to save your highscore. Good luck!'
    };
    // if hide element exists on the page...
    if (hideEl) {
        // ...show the start button
        hideEl.classList.remove('hide');
    };

});

// bind listener to class name for button nested in body
// listen for click in body on class name
document.addEventListener('click', function(e) {
    // if the button clicked is an answer button,
    if (e.target.classList.contains('answer-button')) {
        console.log('answer buttons work');
        if (e.target.classList.contains(currentQuestion.correctAnswer)) {
            console.log('CORRECT ANSWER WORKING')
                // add one to score
            score++;
            if (result.classList.contains('wrong')) {
                // clear class list from result
                result.classList.remove('wrong');
            };

            // add 'correct' to class list to style lines RED
            result.classList.add('correct');
            // render 'correct!' to screen
            result.textContent = 'Correct!'
                // erase message after 1.5 seconds
            setTimeout(function() {
                result.textContent = ''
            }, 1000);
            // increment question index
            i++;
            // ask next quesiton
            questionAsker();
        } else {
            console.log('WRONG ANSWER WORKING')
                // for a wrong answer, take 10 seconds off the clock
            secondsRemaning -= 10;
            // clear class list from result
            result.classList.remove('correct');
            // add 'wrong' to class list to style lines RED
            result.classList.add('wrong');
            // render 'Wrong!' to the page
            result.textContent = 'Wrong!'
                // erase message after 1.5 seconds
            setTimeout(function() {
                result.textContent = ''
            }, 1000);
            //icrement question index
            i++;
            //ask next question
            questionAsker();
        };
    }
});

// if start button el exists on page...
if (startButtonEl) {
    // ...on button click start quiz
    startButtonEl.addEventListener('click', gamestart);
};