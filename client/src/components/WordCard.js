import React,{useEffect, useState} from 'react'
import {WordSound} from './WordSound'
import volume from './volume.png';

export const WordCard = ({ word,onToggle,countAll,countBad,onToggleNav }) => {
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
   <div class="mycontainer">
   <myheader>
       <div>
       Words today : <span className={'text-primary font-weight-bold'}>{countAll}</span></div> 
       <div className={'text-danger font-weight-bold'}><a href="trainsound" className='text-danger'>Bad today : {countBad} </a></div>
       
       </myheader>   
      
       <mymainword >
      <span className={word.train1?' circlegreen ':'circlered'} ></span>
      <span className={'padding-left-right '}> {word.word}</span>
      <span id="wordsound" style={{cursor:'pointer'}} onClick={()=>fPlay()}><img src={volume}/></span>
      </mymainword>
      <mymaintranslate>
      <div ><span className={'word-transcript'}>[{word.transcript}] </span>
       {new Date(word.trainDate)>new Date('1970-01-01')?new Date(word.trainDate).toLocaleDateString():null}
       </div>
      {showDiv ? <div>{word.translate}</div> : null}
      <div >
      <button id="button" onClick={() => setShowDiv(!showDiv)} className="btn btn-info"><span >Show/Hide
            Translate </span>
        </button>
        </div>
       </mymaintranslate>
     <mymenu>
      <div>
      <button onClick={()=>onToggle(word,false)} className={'btn btn-danger'}> <strong> Study </strong></button>
       </div>
       <div>
      <button onClick={()=>onToggle(word,true)} className={'btn-success btn'}>  I know</button>
      </div>

      </mymenu>
     <myfooter>
     
      <span ><button onClick={()=>onToggleNav(word,'prev')} className={'btn-primary btn'}> {'<'} Prev </button></span>
      <span ><button onClick={()=>onToggleNav(word,'next')} className={'btn-primary btn'}>  Next {'>'} </button></span>
      
      </myfooter>
 
     
    </div> {/*mycontainer*/}
    
    </>
  )
}