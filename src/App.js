import "./App.css";
import Board from "./board";
import { useSyncLocalStorage } from "./hooks/utils";

function App() {
  const [history, sethistory] = useSyncLocalStorage(
    "tic-tac-toe-game:history",
    [Array(9).fill()]
  );
  const [currentStep, setcurrentStep] = useSyncLocalStorage(
    "tic-tac-toe-game:step",
    0
  );
  const currentSquares = history[currentStep];
  const nextValue = calculateNextValue(squares);
  const winner = calculateWinner(squares);
  const status = calculateStatus(winner, squares, nextValue);

  function restart() {
    setSquares(initialSquares);
  }
  
  function selectSquare(square) {
    if (winner || currentSquares[square]) {
      return;
    }
    const squaresCopy = [...squares];
    squaresCopy[square] = nextValue;
    setSquares(squaresCopy);
  }
  
  function renderSquare(params) {
    return (
      <button className="square" onClick={() => onClick(params)}>
        {squares[params]}
      </button>
    );
  }
  return (
    <>
      <div className="container">
        <h1 className="heading">Tic Tac Toe</h1>
        <div className="game">
          <div className="game-board">
            <Board
              className="board"
              onClick={selectSquare}
              squares={currentSquare}
            />
          </div>
          <div className="game-info">
            <div>{status}</div>
            <ol>{moves}</ol>
          </div>
        </div>
      </div>
    </>
  );
  function calculateStatus(winner, squares, nextValue) {
    return winner
      ? `Winner: ${winner}`
      : squares.every(Boolean)
      ? `Scratch: Cat's game`
      : `Next player: ${nextValue}`;
  }
  function calculateNextValue(squares) {
    return squares.filter(Boolean).length % 2 === 0 ? "X" : "O";
  }
  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  }
}

export default App;
