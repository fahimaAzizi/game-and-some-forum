let waterScore = 0;
let fireScore = 0;
let roundNumber = 1;
let turn = "Water";
const targetScore = 20;

const waterScoreElement = document.getElementById("water-score");
const fireScoreElement = document.getElementById("fire-score");
const messageElement = document.getElementById("message");
const roundElement = document.getElementById("round");
const rollBtn = document.getElementById("roll-btn");

rollBtn.addEventListener("click", () => {
    const diceRoll = Math.floor(Math.random() * 6) + 1;
    messageElement.textContent = `${turn} rolled a ${diceRoll}`;

    if (turn === "Water") {
        waterScore += diceRoll;
        waterScoreElement.textContent = `Water: ${waterScore}`;
        turn = "Fire";
    } else {
        fireScore += diceRoll;
        fireScoreElement.textContent = `Fire: ${fireScore}`;
        turn = "Water";
    }

    updateRound();
    checkWinner();
});

function updateRound() {
    roundElement.textContent = `Round ${convertNumberToWord(roundNumber)}`;
    roundNumber++;
}

function checkWinner() {
    if (waterScore >= targetScore) {
        messageElement.textContent = "Water wins!";
        rollBtn.disabled = true;
    } else if (fireScore >= targetScore) {
        messageElement.textContent = "Fire wins!";
        rollBtn.disabled = true;
    }
}

function convertNumberToWord(number) {
    const words = ["One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten"];
    return words[number - 1] || number;
}
