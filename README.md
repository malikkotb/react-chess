# React Chess - A simplified version of Chess 

## Deployed on Vercel
This app is deployed on vercel. At this [link](https://react-chess-teal.vercel.app/).

## Description

My task was to build a simplified chess game using React. The goal of that challenge was to showcase my understanding of React, my problem-solving skills, my ability to plan and structure an application, and my capacity to write clean, and maintainable code.

## Screenshots
<img width="550" alt="Screenshot 2023-11-14 at 13 34 12" src="https://github.com/malikkotb/react-chess/assets/50169361/9d1c602d-ca47-401f-be7f-17ac9a58d761">
<img width="550" alt="Screenshot 2023-11-14 at 13 39 05" src="https://github.com/malikkotb/react-chess/assets/50169361/13a83784-fc14-45fe-a02b-e282b66bc4a0">

## Approaches

- The file, "page.js," redners the game's user interface (the gameboard), and includes board flipping.
- The file, "Chessboard.js," serves as the base for the project, rendering the chessboard grid and highlighting possible piece moves based on the state from the store.
- For the chessboard I opted for a two-dimensional 8x8 array, which include the pieces (or empty squares) as strings.
- "Tile.js," serves as a client-side component in the React Chess project and is responsible for rendering individual chessboard tiles. It manages the interactivity of the tiles, including highlighting possible moves based on the game's state and handles moving the chess pieces.
- The `calculateKnightMoves` function determines where a knight can jump using predefined L-shaped move offsets while ensuring it stays within the bounds of the chessboard.
- The `calculateQueenMoves` function determines the potential moves for a queen chess piece by iterating through predefined move offsets, allowing it to move in various directions. It continues to explore each direction while ensuring it stays within the bounds of the chessboard, accumulating valid moves as it goes.
- I used Zustand for state management in my project. (This might have been overkill but I didnt like passing down so many props to the individual Tile components.)
- Functionality if a queen is in check is also implemented.

## Tech Stack

- **Next.js (React)** 
- **TailwindCSS**
- **JavaScript**

## Layout Evolution

- I started by constructing the chessboard grid and representing each square as an HTML element.
- Next, I implemented the game logic, allowing players to select and move chess pieces.
- To manage turns, I designed a system that alternates between white and black players.

## Responsive Design & Layout

- On smaller screens, the layout adjusts to ensure a user-friendly experience.
- While no animations or complex drag-and-drop functionality were added, simple clicking actions are used for piece selection and movement.

## Design

- The design of the chessboard follows a simple checkerboard pattern with basic HTML elements to represent the squares.

## Getting Started

To run the React Chess Challenge locally, follow these steps:

1. Clone the repository to your local machine:
```bash
git clone https://github.com/malikkotb/react-chess.git
```

2. Navigate to the project directory:
```bash
cd react-chess
```

3. Install the required dependencies:
```bash
npm install
```

4. Start the development server:
```bash
npm run dev
```

The React Chess Challenge will be available locally at http://localhost:3000.

