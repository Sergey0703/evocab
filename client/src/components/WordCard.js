import React,{useState} from 'react'
import {WordSound} from '../components/WordSound'

export const WordCard = ({ word,onToggle,countAll,countBad }) => {
  const [showDiv,setShowDiv]=useState(false);
  return (
    <>
       
       Today {countAll} <span style={{color:'red'}}>Bad today {countBad} </span>
      <h2><span className={word.train1?' circlegreen ':'circlered'} ></span>
      {word.word}<WordSound word={word}/></h2>
      {showDiv ? <div>{word.translate}</div> : null}

<button id="button" onClick={() => setShowDiv(!showDiv)} className="btn btn-success">Show/Hide
    Translate
</button>
      
      <p>Дата тренировки: <strong>{new Date(word.trainDate).toLocaleDateString()}</strong></p>
      <button onClick={()=>onToggle(word,false)}>  Study</button>
      <button onClick={()=>onToggle(word,true)}>  I know</button>
    </>
  )
}