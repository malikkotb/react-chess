import { create } from "zustand";

const useMyStore = create((set) => ({
  currentPlayer: "White",
  selectedPiece: null,
  possibleMoves: [],
  boardFlipped: false,
  piecePositions: [
    ["", "", "", "", "", "", "", ""],
    ["N", "", "", "", "", "", "", "Q"],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["q", "", "", "", "", "", "", "n"],
    ["", "", "", "", "", "", "", ""],
  ],
  updateBoardFlip: () =>
    set((state) => ({ boardFlipped: !state.boardFlipped })),
  //   updateBoardFlip: (newBoardFlippedState) =>
  //     set({ boardFlipped: newBoardFlippedState }),
  updatePlayer: () =>
    set((state) => ({
      currentPlayer: state.currentPlayer === "White" ? "Black" : "White",
    })),

  updateSelectedPiece: (newSelectedPiece) =>
    set({ selectedPiece: newSelectedPiece }),
  updatePossibleMoves: (newPossibleMoves) =>
    set({ possibleMoves: newPossibleMoves }),
  updatePiecePositions: (newPiecePositions) =>
    set({ piecePositions: newPiecePositions }),
}));

export default useMyStore;
