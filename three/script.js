const gameBoard = document.getElementById('game-board');
const width = 8;
const candyColors = ['red', 'yellow', 'green', 'blue', 'orange', 'purple'];
let squares = [];

// Create Board
function createBoard() {
    for (let i = 0; i < width * width; i++) {
        const square = document.createElement('div');
        const randomColor = Math.floor(Math.random() * candyColors.length);
        square.classList.add('candy');
        square.classList.add(candyColors[randomColor]);
        square.setAttribute('draggable', true);
        square.setAttribute('id', i);
        gameBoard.appendChild(square);
        squares.push(square);
    }
}

createBoard();

// Dragging functions
let colorBeingDragged;
let colorBeingReplaced;
let squareIdBeingDragged;
let squareIdBeingReplaced;

squares.forEach(square => square.addEventListener('dragstart', dragStart));
squares.forEach(square => square.addEventListener('dragend', dragEnd));
squares.forEach(square => square.addEventListener('dragover', dragOver));
squares.forEach(square => square.addEventListener('dragenter', dragEnter));
squares.forEach(square => square.addEventListener('dragleave', dragLeave));
squares.forEach(square => square.addEventListener('drop', dragDrop));

function dragStart() {
    colorBeingDragged = this.classList[1];
    squareIdBeingDragged = parseInt(this.id);
}

function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
}

function dragLeave() {
}

function dragDrop() {
    colorBeingReplaced = this.classList[1];
    squareIdBeingReplaced = parseInt(this.id);
    this.classList[1] = colorBeingDragged;
    squares[squareIdBeingDragged].classList[1] = colorBeingReplaced;
}

function dragEnd() {
    let validMoves = [
        squareIdBeingDragged - 1, 
        squareIdBeingDragged - width,
        squareIdBeingDragged + 1,
        squareIdBeingDragged + width
    ]
    let validMove = validMoves.includes(squareIdBeingReplaced);

    if (squareIdBeingReplaced && validMove) {
        squareIdBeingReplaced = null;
    } else if (squareIdBeingReplaced && !validMove) {
        squares[squareIdBeingReplaced].classList[1] = colorBeingReplaced;
        squares[squareIdBeingDragged].classList[1] = colorBeingDragged;
    } else squares[squareIdBeingDragged].classList[1] = colorBeingDragged;
}

function checkRowForThree() {
    for (let i = 0; i < 61; i++) {
        let rowOfThree = [i, i + 1, i + 2];
        let decidedColor = squares[i].classList[1];
        const isBlank = squares[i].classList[1] === '';

        if (rowOfThree.every(index => squares[index].classList[1] === decidedColor && !isBlank)) {
            rowOfThree.forEach(index => {
                squares[index].classList[1] = '';
            });
        }
    }
}

function checkColumnForThree() {
    for (let i = 0; i < 47; i++) {
        let columnOfThree = [i, i + width, i + width * 2];
        let decidedColor = squares[i].classList[1];
        const isBlank = squares[i].classList[1] === '';

        if (columnOfThree.every(index => squares[index].classList[1] === decidedColor && !isBlank)) {
            columnOfThree.forEach(index => {
                squares[index].classList[1] = '';
            });
        }
    }
}

window.setInterval(function() {
    checkRowForThree();
    checkColumnForThree();
    moveDown();
}, 100);

function moveDown() {
    for (i = 0; i < 55; i++) {
        if (squares[i + width].classList[1] === '') {
            squares[i + width].classList[1] = squares[i].classList[1];
            squares[i].classList[1] = '';
            const firstRow = [0, 1, 2, 3, 4, 5, 6, 7];
            const isFirstRow = firstRow.includes(i);
            if (isFirstRow && squares[i].classList[1] === '') {
                let randomColor = Math.floor(Math.random() * candyColors.length);
                squares[i].classList.add(candyColors[randomColor]);
            }
        }
    }
}
