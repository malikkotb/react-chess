import { create } from "zustand";

// Zustand state management store
const useMyStore = create((set) => ({
  // global state variables
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
  gameOver: false,
  checkOnQueen: false,

  // global state updating functions
  updateCheckOnQueen: (isCheckOnQueen) => set({ checkOnQueen: isCheckOnQueen }),
  updateBoardFlip: () =>
    set((state) => ({ boardFlipped: !state.boardFlipped })),
  updatePlayer: () =>
    set((state) => ({
      currentPlayer: state.currentPlayer === "White" ? "Black" : "White",
    })),
  updateGameOver: () => set((state) => ({ gameOver: !state.gameOver })),
  updateSelectedPiece: (newSelectedPiece) =>
    set({ selectedPiece: newSelectedPiece }),
  updatePossibleMoves: (newPossibleMoves) =>
    set({ possibleMoves: newPossibleMoves }),
  updatePiecePositions: (newPiecePositions) =>
    set({ piecePositions: newPiecePositions }),
}));

export default useMyStore;
