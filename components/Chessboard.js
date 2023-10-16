import Tile from "./Tile";

export default function Chessboard() {
  const board = [];

  const letters = ['A','B','C','D','E','F','G','H']

  // two loops to create the board
  for (let rowIndex = 0; rowIndex < 8; rowIndex++) {
    for (let colIndex = 0; colIndex < 8; colIndex++) {
      board.push(
        <Tile
          rowIndex={rowIndex}
          colIndex={colIndex}
          key={`${colIndex}-${rowIndex}`}
        />
      );
    }
  }


  return (
    <div className="grid grid-cols-8 gap-0 w-[600px] h-[600px] bg-transparent">
      {board}
    </div>
  );
}
