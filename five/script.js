const quizContainer = document.getElementById('quiz');
const resultsContainer = document.getElementById('results');
const submitButton = document.getElementById('submit');

// Quiz questions
const quizQuestions = [
    {
        question: "What is the capital of France?",
        answers: {
            a: "Berlin",
            b: "Madrid",
            c: "Paris",
            d: "Lisbon"
        },
        correctAnswer: "c"
    },
    {
        question: "Who is the CEO of Tesla?",
        answers: {
            a: "Jeff Bezos",
            b: "Elon Musk",
            c: "Bill Gates",
            d: "Warren Buffet"
        },
        correctAnswer: "b"
    },
    {
        question: "What is the largest planet in the solar system?",
        answers: {
            a: "Earth",
            b: "Jupiter",
            c: "Mars",
            d: "Venus"
        },
        correctAnswer: "b"
    },
    {
        question: "What year did World War I start?",
        answers: {
            a: "1914",
            b: "1939",
            c: "1920",
            d: "1918"
        },
        correctAnswer: "a"
    }
];

// Function to generate the quiz
function buildQuiz() {
    const output = [];
    quizQuestions.forEach((currentQuestion, questionNumber) => {
        const answers = [];
        for (letter in currentQuestion.answers) {
            answers.push(
                `<label>
                    <input type="radio" name="question${questionNumber}" value="${letter}">
                    ${letter} : ${currentQuestion.answers[letter]}
                </label>`
            );
        }
        output.push(
            `<div class="question">${currentQuestion.question}</div>
            <div class="answers">${answers.join('')}</div>`
        );
    });
    quizContainer.innerHTML = output.join('');
}

// Function to show results
function showResults() {
    const answerContainers = quizContainer.querySelectorAll('.answers');
    let numCorrect = 0;

    quizQuestions.forEach((currentQuestion, questionNumber) => {
        const answerContainer = answerContainers[questionNumber];
        const selector = `input[name=question${questionNumber}]:checked`;
        const userAnswer = (answerContainer.querySelector(selector) || {}).value;

        if (userAnswer === currentQuestion.correctAnswer) {
            numCorrect++;
            answerContainer.style.color = 'lightgreen';
        } else {
            answerContainer.style.color = 'red';
        }
    });

    resultsContainer.innerHTML = `${numCorrect} out of ${quizQuestions.length}`;
}

// Display quiz right away
buildQuiz();

// On submit, show results
submitButton.addEventListener('click', showResults);
