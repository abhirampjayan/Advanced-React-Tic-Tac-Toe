import React from "react";
export default function Board({onClick,squares}) {
  function renderSquare(params) {
    return (
      <button className="square" onClick={() => onClick(params)}>
        {squares[params]}
      </button>
    );
  }

  return (
    <div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
      
    </div>
  );
  
}
