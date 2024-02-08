import React, { useEffect, useState } from 'react';
import './TicTacToe.css';

const Square =({value, onClick})=>{
    return <button onClick={onClick} className='square'>{value}</button>
}
const getWinner=(squares)=>{
    const patternWinner = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [2,5,8],
        [0,4,8],
        [0,3,6],
        [1,4,7]
    ]
    for(let i=0; i<patternWinner.length; i++){
        const [x,y,z] = patternWinner[i];
        if(squares[x]&& squares[x]===squares[y] && squares[x]===squares[z]){
            return squares[x]
        }
        return null;
    }
}
const TicTacToe = () => {
    const [squares, setSquares] = useState(Array(9).fill(''));
    const [isXturn, setXturn] = useState(true);
    const [status, setStatus] = useState(" ");
    const handleClick= (getCurrentSquare)=>{
        let cpySquares = [...squares];
        if(getWinner(cpySquares)||cpySquares[getCurrentSquare]){
            return;
        }
        cpySquares[getCurrentSquare] = isXturn?'X':'O';
        setXturn(!isXturn);
        setSquares(cpySquares);
    }
    useEffect(()=>{
        if(!getWinner(squares)&& squares.every((item)=>item !=="")){
            setStatus(`Please this is a draw! restart the game`);
        }else if(getWinner(squares)){
            setStatus(`Winner is ${getWinner(squares)} please restart game!`);
        }else{
            setStatus(`Next player is ${isXturn ? "X":"O"}`);
        }
    },[squares,isXturn]);

    const handleRestart=()=>{
        setXturn(true);
        setSquares(Array(9).fill(''));
    }
    
  return (
    <div className='container' style={{marginTop:'100px' }}>
        <h1>Tic-Tac-Toe</h1>
        <div className='row'>
            <Square value={squares[0]} onClick={()=>handleClick(0)}/>
            <Square value={squares[1]} onClick={()=>handleClick(1)}/>
            <Square value={squares[2]} onClick={()=>handleClick(2)}/>
        </div>
        <div className='row'>
            <Square value={squares[3]} onClick={()=>handleClick(3)}/>
            <Square value={squares[4]} onClick={()=>handleClick(4)}/>
            <Square value={squares[5]} onClick={()=>handleClick(5)}/>
        </div>
        <div className='row'>
            <Square value={squares[6]} onClick={()=>handleClick(6)}/>
            <Square value={squares[7]} onClick={()=>handleClick(7)}/>
            <Square value={squares[8]} onClick={()=>handleClick(8)}/>
        </div>
        <h1>{status}</h1>
        <button className='btn' onClick={handleRestart} >Restart</button>
    </div>
  );
}
export default TicTacToe;
