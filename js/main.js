/*----- constants -----*/
const ICONS = {
    '1': 'X',
    '-1': 'O',
    '0': null
}

/*----- app's state (variables) -----*/ 
let board, turn, winner;

/*----- cached element references -----*/ 
let msg = document.getElementById('msg');

/*----- event listeners -----*/ 
document.querySelector('.board').addEventListener('click', handleClick);
document.querySelector('button').addEventListener('click', init);


/*----- functions -----*/
init(); 

function init() {
    board = [
        [0,0,0],
        [0,0,0],
        [0,0,0]
    ]

    turn = 1;
    winner = null;
    render();
}
function handleClick(evt) {
    col = parseInt(evt.target.id.charAt(1));
    row = parseInt(evt.target.id.charAt(3));
    if(board[col][row] === 0 && !winner) {
        board[col][row] = turn;
        turn *= -1;
    }
    render();
}

function render() {
    board.forEach(function(colArr, colIdx) {
        colArr.forEach(function(cell, rowIdx) {
            let div = document.getElementById(`c${colIdx}r${rowIdx}`);
            div.textContent = ICONS[cell];
        });
    });
    msg.textContent = `${ICONS[turn]}'s Turn`
}