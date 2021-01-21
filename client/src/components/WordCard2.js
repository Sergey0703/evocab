import React,{useEffect, useState} from 'react'
import {WordSound} from './WordSound'

export const WordCard2 = ({ word,onToggle,countAll,countBad,onToggleNav }) => {
  const [showDiv,setShowDiv]=useState(false);
  useEffect(()=>{
    setShowDiv(false)
  },[word])
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
     
      
    </>
  )
}