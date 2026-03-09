const questionsBank = [
    {
        question: "What does 'var' do in JavaScript?",
        options: ["Declares a variable", "Creates a function", "Defines a class", "Imports a module"],
        correctIndex: 0,
        difficulty: "easy"
    },
    {
        question: "Which method removes the last element from an array?",
        options: ["shift()", "unshift()", "pop()", "splice()"],
        correctIndex: 2,
        difficulty: "easy"
    },
    {
        question: "How do you write 'Hello' in an alert box?",
        options: ["alertBox('Hello')", "msg('Hello')", "alert('Hello')", "print('Hello')"],
        correctIndex: 2,
        difficulty: "easy"
    },
    {
        question: "Which is NOT a JavaScript data type?",
        options: ["String", "Boolean", "Float", "Undefined"],
        correctIndex: 2,
        difficulty: "medium"
    },
    {
        question: "What does 'NaN' stand for?",
        options: ["Not a Node", "Null and None", "Not a Number", "New and Null"],
        correctIndex: 2,
        difficulty: "medium"
    },
    {
        question: "What does the 'this' keyword refer to inside an arrow function?",
        options: ["The arrow function itself", "The global object always", "The enclosing lexical context", "undefined"],
        correctIndex: 2,
        difficulty: "medium"
    },
    {
        question: "What is a closure in JavaScript?",
        options: ["A way to close the browser", "A function that remembers its outer scope", "A method to end a loop", "A type of error"],
        correctIndex: 1,
        difficulty: "medium"
    },
    {
        question: "What does Promise.all() do when one promise rejects?",
        options: ["Ignores it and continues", "Returns the resolved ones", "Immediately rejects with that error", "Returns undefined"],
        correctIndex: 2,
        difficulty: "hard"
    },
    {
        question: "What is the output of: console.log(typeof typeof 42)?",
        options: ["number", "string", "undefined", "object"],
        correctIndex: 1,
        difficulty: "hard"
    },
    {
        question: "What is the Event Loop responsible for in JavaScript?",
        options: ["Managing CSS animations", "Handling async callbacks from the queue", "Compiling JavaScript code", "Managing memory allocation"],
        correctIndex: 1,
        difficulty: "hard"
    },

    // ── 10 NEW QUESTIONS ──

    {
        question: "Which keyword is used to create a function in JavaScript?",
        options: ["func", "def", "function", "lambda"],
        correctIndex: 2,
        difficulty: "easy"
    },
    {
        question: "How do you access the first element of an array called 'arr'?",
        options: ["arr[1]", "arr.first()", "arr[0]", "arr.get(0)"],
        correctIndex: 2,
        difficulty: "easy"
    },
    {
        question: "Which sign is used for single line comment in JavaScript?",
        options: ["#", "//", "--", "/*"],
        correctIndex: 1,
        difficulty: "easy"
    },
    {
        question: "What does the 'typeof' operator return for an array?",
        options: ["array", "list", "object", "undefined"],
        correctIndex: 2,
        difficulty: "medium"
    },
    {
        question: "What is the difference between '==' and '==='?",
        options: [
            "No difference",
            "=== checks value only",
            "== checks value and type",
            "=== checks value and type, == checks value only"
        ],
        correctIndex: 3,
        difficulty: "medium"
    },
    {
        question: "What will 'console.log([] + [])' output?",
        options: ["[]", "0", "null", "empty string"],
        correctIndex: 3,
        difficulty: "medium"
    },
    {
        question: "Which method is used to convert an array to a string?",
        options: ["toString()", "stringify()", "join()", "Both toString() and join()"],
        correctIndex: 3,
        difficulty: "medium"
    },
    {
        question: "What does 'debouncing' mean in JavaScript?",
        options: [
            "Removing duplicate array items",
            "Delaying function execution until after a wait time",
            "Cancelling a Promise",
            "Clearing the call stack"
        ],
        correctIndex: 1,
        difficulty: "hard"
    },
    {
        question: "What is the output of: console.log(1 + '2' + 3)?",
        options: ["6", "123", "'123'", "Error"],
        correctIndex: 1,
        difficulty: "hard"
    },
    {
        question: "What is 'prototype chaining' in JavaScript?",
        options: [
            "Linking CSS classes",
            "Chaining multiple promises",
            "Objects inheriting properties from other objects",
            "Connecting functions together"
        ],
        correctIndex: 2,
        difficulty: "hard"
    }
];



let questionIndex = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]

function questionRandom() {
    if (questionIndex.length === 0) return null
    let num = Math.floor(Math.random() * questionIndex.length)
    let index = questionIndex[num]
    questionIndex.splice(num, 1)
    return index
}

let queIndex;
let score = 0;
let answered = false;
let progressIndex = 0;
let heartCount = 3;
let timerInterval = null;
let questionID = document.getElementById('question-text')
let nextbtn = document.getElementById('next-btn')
let skipbtn = document.getElementById('skip-btn')
let points = document.getElementById('points-badge')
let btns = document.querySelectorAll('.option')
let level = document.getElementById('difficulty-badge')
let timer = document.getElementById('timer-display')
let statsPoints = document.getElementById('score-val')
let hearts = document.querySelectorAll('.heart')

function startTimer() {
    clearInterval(timerInterval);
    let count = 15;
    timer.innerText = `00:15`

    timerInterval = setInterval(() => {
        count--
        if (count > 9) {
            timer.innerText = `00:${count}`
        } else {
            timer.innerText = `00:0${count}`
        }
        if (count === 0) {
            clearInterval(timerInterval)
            questionPaper()
        }
    }, 1000)
}

function resetQuiz() {
    heartCount = 3;
    hearts.forEach(h => h.style.opacity = '1');
    score = 0;
    points.innerText = `0 points`;
    statsPoints.innerText = `0 points`;
    progressIndex = 0;
    questionIndex = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]
    questionPaper();
}

function questionPaper() {
    queIndex = questionRandom()

    if (queIndex === null) {
        clearInterval(timerInterval)
        questionID.innerText = "Quiz Finished!";
        return;
    }

    btns.forEach(b => {
        b.classList.remove('selected', 'correct', 'wrong');
    });
    answered = false;

    let optionsArr = questionsBank[queIndex].options
    questionID.innerText = questionsBank[queIndex].question

    for (let i = 0; i < optionsArr.length; i++) {
        const btn = document.querySelector(`.option[data-index="${i}"]`);
        let text = btn.querySelector('.option-text')
        text.innerText = optionsArr[i]
    }

    level.innerText = questionsBank[queIndex].difficulty

    progressIndex++
    let progress = document.getElementById('progress-val')
    progress.innerText = `${progressIndex}/20`

    startTimer()
}

window.addEventListener('load', questionPaper)
nextbtn.addEventListener('click', questionPaper)
skipbtn.addEventListener('click', questionPaper)

btns.forEach(btn => {
    btn.addEventListener('click', function () {
        if (answered) return;
        answered = true;

        const index = Number(this.dataset.index)
        const cindex = questionsBank[queIndex].correctIndex

        document.querySelectorAll('.option').forEach(opt => opt.classList.remove('selected'));
        this.classList.add('selected');

        if (index == cindex) {
            score += 100
            points.innerText = `${score} points`
            statsPoints.innerText = `${score} points`
            this.classList.add('correct');
        } else {
            this.classList.add('wrong');

            heartCount--;
            hearts[heartCount].style.opacity = '0.2';

            if (heartCount === 0) {
                clearInterval(timerInterval);
                setTimeout(() => {
                    alert("Game Over!");
                    resetQuiz();
                }, 500);
            }
        }
    });
});