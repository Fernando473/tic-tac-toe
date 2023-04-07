import { useState } from "react";
import "./App.css";

const TURNS = {
  X: "x",
  O: "o",
};


const Square = ({ children, isSelected, updateBoard, index }) => {
  
  const className = `square ${isSelected ? "is-selected" : ""}`;
  
  const handleClick = () => {
    updateBoard(index);
  };

  return (
    <div className={className} onClick={handleClick}>
      {children}
    </div>
  );
};

const WINNER_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function App() {
  
  const [board, setBoard] = useState( Array(9).fill(null))
  
  const [turn, setTurn] = useState(TURNS.X)

  const [winner, setWinner] = useState(null)

  const checkWinner = (boardToCheck) => {
    for(const combo of WINNER_COMBINATIONS){
      const [a, b, c] = combo;
      if(boardToCheck[a] && boardToCheck[a] === boardToCheck[b] && boardToCheck[a] === boardToCheck[c]){
        return boardToCheck[a];
      }
    }
    return null;
  }

  // Volvemos a empezar el juego con el estado inicial de las variables
  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(null);
  }


  // Función que actualiza el estado del tablero y cambia el turno
  const updateBoard = (index) => {
    
    // TODO: Estudiar como funciona el operador spread (...)

    if (board[index] || winner) return; // Si el cuadro ya está ocupado, no se hace nada

    /* IMPORTANTE: Siempre se debe tratar al estado como algo inmutable */
    const newBoard = [...board]; // Copia del estado actual del tablero 
    newBoard[index] = turn;
    setBoard(newBoard);

    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);

    const newWinner = checkWinner(newBoard);
    if(newWinner){
      // IMPORTANTE: La actualización del estado es asincrona
      setWinner(newWinner);
    }
    // Chequear si hay un ganador

  }
  
  return (
    <main className="board">
        <h1>Tic Tac Toe</h1>
        <section className="game">
          {board.map((_, index) => {
            return (
              /* 
                : Tomar en cuenta que la función updateBoard no debe ser ejecutada
                  sino que debe ser pasada como referencia para que sea ejecutada 
                  cuando el componente Square sea clickeado. :D
              */
              <Square key={index} index={index} updateBoard = {updateBoard}>
                {board[index]}
              </Square>
            );
          })}
        </section>

        <section className="turn">
          <Square isSelected = {turn === TURNS.X}>{TURNS.X}</Square>
          <Square isSelected = {turn === TURNS.O}>{TURNS.O}</Square>
        </section>

        {
          winner !== null && (
            <section className="winner">
              <div className="text">
                <h2>
                  {
                    winner === false
                    ? "Empate"
                    : `Ganó:`
                  }
                </h2>

                <header className="win">
                  {winner && <Square>{winner}</Square>}
                </header>

                <footer>
                  <button onClick={resetGame}>Empezar de nuevo</button>
                </footer>
              </div>
            </section>

          )
        }
    </main>
  );
}

export default App;
