import { useState } from 'react'
import './App.css'
import { renderToReadableStream } from 'react-dom/server'


const Square= ({ value , onSquareClick })=> <button className='square' onClick={onSquareClick} >{value}</button>


function Board({xIsNext , squares , onPlay}) {

  function handleClick(i){
      if(calculateWinner(squares) || squares[i]) return;

      const nextSquares = squares.slice()

      if(xIsNext){
        nextSquares[i]='X'
      }
      else{
        nextSquares[i]='O'
      }
      onPlay(nextSquares)
  }
  
  let status;
  
  let winner = calculateWinner(squares)
  if(winner){
    status=`winner: ${winner}` 
  }
  else{
    status=`Current Player:  ${xIsNext ? "X"  : "O"} `
  }

  return(
    <>
    <div className='board-row'>
      <Square value={squares[0]} onSquareClick={() => handleClick(0)}/>
      <Square value={squares[1]} onSquareClick={() => handleClick(1)}/>
      <Square value={squares[2]} onSquareClick={() => handleClick(2)}/>
    </div>
    
    <div className='board-row'>
      <Square value={squares[3]} onSquareClick={() => handleClick(3)}/>
      <Square value={squares[4]} onSquareClick={() => handleClick(4)}/>
      <Square value={squares[5]} onSquareClick={() => handleClick(5)}/>
    </div>

    <div className='board-row'>
      <Square value={squares[6]} onSquareClick={() => handleClick(6)}/>
      <Square value={squares[7]} onSquareClick={() => handleClick(7)}/>
      <Square value={squares[8]} onSquareClick={() => handleClick(8)}/>
    </div>
      <h1 value={status}> {status} </h1>
    </>
  )

}

function Game(){
  const [xIsNext , setXIsNext] = useState(true)
  const [history , setHistory] = useState([Array(9).fill(null)])
  const [currentMove , setCurrentMove] = useState(0)
  const currentSquares=history[currentMove]

  function handlePlay(nextSquares){
    const nextHistory = [...history.slice(0 , currentMove + 1 ) , nextSquares] 
    setHistory(nextHistory)
    setCurrentMove(nextHistory.length - 1)
    setXIsNext(!xIsNext)
  } 

  function jumpTo(nextMove){
      setCurrentMove(nextMove)
      setXIsNext(nextMove % 2 === 0)
  }


  const moves= history.map((square , move) => {
    let description;
      if(move > 0){
        description = 'Go to move ' + move
      }
      else{
        description = 'go to start'
      }

      return (<>
        <li key={move}>
          <button onClick={() => jumpTo(move)}> {description} </button>
        </li>
      
      </>)
  })

  return (
    <div className="game">
        <div className='game-board'>
          <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay}/>
        </div>
    <div className='game-info'>
        <ol> {moves} </ol>
    </div>
    </div>
  )
}


function calculateWinner(squares){

  const winningPositions=[
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]
  const winner =  winningPositions.find(position =>
    squares[position[0]] &&  // Ensure it's not null
    position.every(index => squares[index] === squares[position[0]])) // Check if all are the same

  return winner ? squares[winner[0]] : null
} 


export default function App() {

  return (
  <>
    <Game/>
  </>
  )
}





