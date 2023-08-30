import { useState } from 'react';

const generateBoard = (size: number): (string | undefined)[][] => {
  const sizeArray = Array(size).fill(0);
  return sizeArray.map(() => Array(size).fill(undefined));
};

const checkHorizontal = (board: (string | undefined)[][]): boolean => {
  for (let i = 0; i < board.length; i++) {
    const row = board[i];
    const rowSet = new Set(row);
    if (rowSet.size === 1 && !rowSet.has(undefined)) {
      return true;
    }
  }
  return false;
};

const invertMatrix = (board: (string | undefined)[][]): (string | undefined)[][] => {
  const newBoard = [];
  for (let col = 0; col < board.length; col++) {
    const newRow = [];
    for (let row = 0; row < board.length; row++) {
      newRow.push(board[row][col]);
    }
    newBoard.push(newRow);
  }
  return newBoard;
};

const diagToRow = (board: (string | undefined)[][]) => {
  const diags: (string | undefined)[][] = [[], []];
  let inc = 0;
  let dec = board.length - 1;
  while (inc < board.length) {
    diags[0].push(board[inc][inc]);
    diags[1].push(board[inc][dec]);
    inc++;
    dec--;
  }
  return diags;
};

const checkWin = (board: (string | undefined)[][]): boolean => {
  return checkHorizontal(board)
    || checkHorizontal(invertMatrix(board))
    || checkHorizontal(diagToRow(board));
};

function App() {
  const [board, setBoard] = useState(generateBoard(3));
  const [message, setMessage] = useState('');
  const [currentPlayer, setCurrentPlayer] = useState('x');

  const handleClick = (row: number, col: number) => {
    if (board[row][col] === undefined) {
      board[row][col] = currentPlayer;
      setBoard([...board]);
      setCurrentPlayer(currentPlayer === 'x' ? 'y' : 'x');
      if (checkWin(board)) {
        setBoard(generateBoard(3));
        setMessage(`${currentPlayer} won!`);
      }
    }
  };

  return (
    <div>
      {
        board.map((row, r) => (
          <div
            key={ r }
            style={ { display: 'flex' } }
          >
            {
              row.map((cell, c) => (
                <button
                  key={ c }
                  style={ {
                    border: 'solid 1px black',
                    height: '100px',
                    width: '100px',
                    fontSize: '50px',
                  } }
                  onClick={ () => handleClick(r, c) }
                >
                  {cell}
                </button>))
            }
          </div>
        ))
      }
      <div>{message}</div>
    </div>
  );
}

export default App;
