const gameBoard = document.getElementById('game-board');
const resetButton = document.getElementById('reset-button');

const cards = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H'];
let flippedCards = [];
let matchedPairs = 0;

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function createBoard() {
    shuffle(cards);
    gameBoard.innerHTML = '';
    cards.forEach((card, index) => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.dataset.cardValue = card;
        cardElement.dataset.index = index;
        cardElement.addEventListener('click', flipCard);
        gameBoard.appendChild(cardElement);
    });
}

function flipCard() {
    if (flippedCards.length < 2 && !this.classList.contains('flipped')) {
        this.classList.add('flipped');
        this.textContent = this.dataset.cardValue;
        flippedCards.push(this);
        if (flippedCards.length === 2) {
            setTimeout(checkForMatch, 1000);
        }
    }
}

function checkForMatch() {
    const [card1, card2] = flippedCards;
    if (card1.dataset.cardValue === card2.dataset.cardValue) {
        matchedPairs++;
        if (matchedPairs === cards.length / 2) {
            setTimeout(() => alert('You win!'), 300);
        }
    } else {
        card1.classList.remove('flipped');
        card1.textContent = '';
        card2.classList.remove('flipped');
        card2.textContent = '';
    }
    flippedCards = [];
}

function resetGame() {
    flippedCards = [];
    matchedPairs = 0;
    createBoard();
}

resetButton.addEventListener('click', resetGame);

createBoard();
