import React from "react";

export default function chessboard() {
  const board = [];

  const letters = ['A','B','C','D','E','F','G','H']

  // two loops to create the board
  for (let i = 0; i < 8; i++) {
    const row = [];
    for (let j = 0; j < 8; j++) {
      row.push(<div onClick={() => console.log((letters[i]), (8-j))} className={`w-[75px] h-[75px] ${(i + j) % 2 === 0 ? 'bg-[#ebecd0]' : ''}`} key={j}></div>);
    }
    board.push(
      <div className="flex flex-col" key={i}>
        {row}
      </div>
    );
  }



  return (
    <div className="grid grid-cols-8 gap-0 w-[600px] h-[600px] bg-[#779556]">
        {board}
    </div>
  );
}
