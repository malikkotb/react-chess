"use client";
import { useState } from "react";
import Chessboard from "../components/Chessboard";
import useMyStore from "./(store)/store";

export default function Home() {
  const { currentPlayer, piecePositions, boardFlipped, updateBoardFlip, updatePiecePositions} = useMyStore();

  const flipBoard = (board) => {
    return board.slice().reverse().map(row => row.slice().reverse());
  };

  const handleFlip = () => {
    updateBoardFlip();
    updatePiecePositions(flipBoard(piecePositions));
  };

  return (
    <main className="bg-[#202020]">
      <div className="flex items-center justify-center h-screen">
        <div>
          <Chessboard />
          <div className="flex flex-col items-center">
            <div className="text-white text-2xl p-4">{currentPlayer} Turn</div>
            <button onClick={handleFlip} className="rounded-xl p-2 bg-white text-black">
              { boardFlipped ? "Unflip" : "Flip Board"}
              
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
