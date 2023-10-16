"use client"
export default function Tile({ rowIndex, colIndex }) {
  const helper = (rowIndex, colIndex) => {
    console.log("Row index = ", rowIndex);
    console.log("Column index = ", colIndex);
  };

  const piecePositions = [
    ["", "", "", "", "", "", "", ""],
    ["N", "", "", "", "", "", "", "Q"], // Black pieces (Uppercase)
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["q", "", "", "", "", "", "", "n"], // white pieces (lowercase)
    ["", "", "", "", "", "", "", ""], 
  ];

  const getPieceImage = () => {
    const piece = piecePositions[rowIndex][colIndex]; // Get the piece for this cell
    console.log(piece);
    switch (piece) {
      case "Q":
        return "/assets/queen_dark.svg";
      case "N":
        return "/assets/knight_dark.svg";
      case "q":
        return "/assets/queen_light.svg";
      case "n":
        return "/assets/knight_light.svg";
      default:
        return null
    }
  };

  return (
    <div
      className={`w-[75px] h-[75px] ${
        (rowIndex + colIndex) % 2 === 0 ? "bg-[#ebecd0]" : "bg-[#779556]"
      } grid place-content-center`}
    >
      {getPieceImage() !== null && <img
        src={getPieceImage()}
        className="h-12 w-12"
      ></img>}
    </div>
  );
}
