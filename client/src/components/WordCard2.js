import React,{useEffect, useState} from 'react'
import {WordSound} from './WordSound'

export const WordCard2 = ({ word,onToggle,countAll,countBad,onToggleNav }) => {
  const [showDiv,setShowDiv]=useState(false);
  useEffect(()=>{
    setShowDiv(false)
  },[word])

  const fPlay=() =>{
    let soundSrc=word.sound.replace('sound','');
    soundSrc=soundSrc.replace('[','');
    soundSrc=soundSrc.replace(']','');
    soundSrc=soundSrc.replace(':','');
    const ChirpChirp = new Audio (soundSrc);
    ChirpChirp.play();
    console.log('fplay',ChirpChirp)
   // console.log('fPlay',wordAudio)
   // console.log('sound',soundSrc)
   // wordAudio.play()
}

  return (
    <>
       
       Today {countAll} <span style={{color:'red'}}>Bad today {countBad} </span>
      <h2><span className={word.train1?' circlegreen ':'circlered'} ></span>
      {word.word}
      <span id="wordsound" style={{cursor:'pointer'}} onClick={()=>fPlay()}><img src="volume.png"/></span>
      </h2>
      {showDiv ? <div>{word.translate}</div> : null}

<button id="button" onClick={() => setShowDiv(!showDiv)} className="btn btn-success">Show/Hide
    Translate
</button>
      
      <p>Дата тренировки: <strong>{new Date(word.trainDate).toLocaleDateString()}</strong></p>
     
      
    </>
  )
}