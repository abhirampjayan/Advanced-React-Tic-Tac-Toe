import "./App.css";
import Board from "./board";
import { useSyncLocalStorage } from "./hooks/utils";

function App() {
  const [history, setHistory] = useSyncLocalStorage(
    "tic-tac-toe-game:history",
    [Array(9).fill()]
  );
  const [currentStep, setCurrentStep] = useSyncLocalStorage(
    "tic-tac-toe-game:step",
    0
  );
  const currentSquares = history[currentStep];
  const nextValue = calculateNextValue(currentSquares);
  const winner = calculateWinner(currentSquares);
  const status = calculateStatus(winner, currentSquares, nextValue);

  function restart() {
    setHistory([Array(9).fill(null)]);
    setCurrentStep(0);
  }

  function selectSquare(square) {
    if (winner || currentSquares[square]) {
      return;
    }
    const newHistory = history.slice(0, currentStep + 1);
    const squares = [...currentSquares];
    squares[square] = nextValue;
    setHistory([...newHistory, squares]);
    setCurrentStep(newHistory.length);
  }
  const moves = history.map((stepSquares, step) => {
    const desc = step ? `Go to move #${step}` : "Go to game start";
    const isCurrentStep = step === currentStep;
    return (
      <li key={step}>
        <button className={isCurrentStep ? "steps current" : "steps"} disabled={isCurrentStep} onClick={() => setCurrentStep(step)}>
          {desc} 
        </button>
      </li>
    );
  });

  return (
    <>
      <div className="container">
        <h1 className="heading">Tic Tac Toe</h1>
        <div className="game">
          <div className="game-board">
            <Board
              className="board"
              onClick={selectSquare}
              squares={currentSquares}
            />
            <button className="restart" onClick={restart}>
              restart
            </button>
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
