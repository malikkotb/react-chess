"use client";
import { useState } from "react";
import Chessboard from "../components/chessboard";

export default function Home() {
  const [player, setPlayer] = useState("White");


  return (
    <main className="bg-[#202020]">
      <div className="flex items-center justify-center h-screen">
        <div>
          <Chessboard />
          <div className="text-white text-2xl flex justify-center p-4">{player}'s Turn</div>
        </div>
      </div>
    </main>
  );
}
