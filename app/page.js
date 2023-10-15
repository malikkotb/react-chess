"use client";
import { useState } from "react";
import Chessboard from "../components/chessboard/chessboard";

export default function Home() {
  const [player, setPlayer] = useState("White");


  return (
    <main className="bg-[#202020]">
      <div className="flex items-center justify-center h-screen">
        <div>
          <Chessboard />
          <div className="text-white flex justify-center">{player}'s Turn</div>
        </div>
      </div>
    </main>
  );
}
