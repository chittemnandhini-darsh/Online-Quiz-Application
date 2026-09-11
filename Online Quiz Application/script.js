const questions = [
    {
        question: "Which language is used to create the structure of a web page?",
        options: ["HTML", "CSS", "JavaScript", "Python"],
        answer: "HTML"
    },

    {
        question: "Which language is used to style a web page?",
        options: ["HTML", "CSS", "Java", "Python"],
        answer: "CSS"
    },

    {
        question: "Which language is mainly used to add interactivity to web pages?",
        options: ["HTML", "CSS", "JavaScript", "SQL"],
        answer: "JavaScript"
    },

    {
        question: "Which HTML tag is used to create a hyperlink?",
        options: ["<p>", "<a>", "<h1>", "<img>"],
        answer: "<a>"
    },

    {
        question: "Which CSS property is used to change text color?",
        options: ["font-size", "background", "color", "margin"],
        answer: "color"
    }
];

let currentQuestion = 0;
let score = 0;
let selectedAnswer = "";
let timeLeft = 30;
let timer;

const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");

function startQuiz() {

    startScreen.classList.add("hide");
    quizScreen.classList.remove("hide");

    currentQuestion = 0;
    score = 0;

    loadQuestion();
}

function loadQuestion() {

    clearInterval(timer);

    selectedAnswer = "";
    timeLeft = 30;

    document.getElementById("question-number").textContent =
        "Question " + (currentQuestion + 1) + " / " + questions.length;

    document.getElementById("question").textContent =
        questions[currentQuestion].question;

    const optionsDiv = document.getElementById("options");

    optionsDiv.innerHTML = "";

    questions[currentQuestion].options.forEach(option => {

        const button = document.createElement("button");

        button.textContent = option;
        button.classList.add("option");

        button.onclick = function () {

            document.querySelectorAll(".option").forEach(btn => {
                btn.classList.remove("selected");
            });

            button.classList.add("selected");

            selectedAnswer = option;
        };

        optionsDiv.appendChild(button);
    });

    startTimer();
}

function startTimer() {

    document.getElementById("timer").textContent =
        "Time: " + timeLeft + "s";

    timer = setInterval(() => {

        timeLeft--;

        document.getElementById("timer").textContent =
            "Time: " + timeLeft + "s";

        if (timeLeft <= 0) {

            clearInterval(timer);
            nextQuestion();
        }

    }, 1000);
}

function nextQuestion() {

    clearInterval(timer);

    if (selectedAnswer === questions[currentQuestion].answer) {
        score++;
    }

    currentQuestion++;

    if (currentQuestion < questions.length) {

        loadQuestion();

    } else {

        showResult();
    }
}

function showResult() {

    quizScreen.classList.add("hide");
    resultScreen.classList.remove("hide");

    document.getElementById("score").textContent =
        "Your Score: " + score + " / " + questions.length;

    if (score >= 4) {

        document.getElementById("message").textContent =
            "Excellent! Great job!";

    } else if (score >= 3) {

        document.getElementById("message").textContent =
            "Good work! Keep practicing.";

    } else {

        document.getElementById("message").textContent =
            "Keep learning and try again!";
    }
}

function restartQuiz() {

    resultScreen.classList.add("hide");
    startScreen.classList.remove("hide");

}