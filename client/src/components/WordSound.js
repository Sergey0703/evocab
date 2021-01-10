import React, {useEffect,useState} from 'react';

export const WordSound =({word})=>{

    let [wordAudio, setWordAudio]=useState();

    useEffect(()=>{
      console.log('WordSounduseEffect')
        const sound = document.getElementById('wordsound');
        wordAudio = document.getElementById('wordAudio');
        sound.addEventListener('click', fPlay, false);
       // wordAudio=wordAudio.replace({'sound':''});
       setWordAudio (wordAudio);
    },[word]);

    const fPlay=() =>{
        console.log('fPlay',wordAudio)
        wordAudio.play()
    }
console.log('before WordSound')
//<source src={ word.sound.replace({'sound:': ""}) } type="audio/mpeg"/>
    let soundSrc=word.sound.replace('sound','');
    soundSrc=soundSrc.replace('[','');
    soundSrc=soundSrc.replace(']','');
    soundSrc=soundSrc.replace(':','');
    //console.log('src=',soundSrc);
    return(
    <>
        
        <span className="myclass1">
            <audio id='wordAudio'>
                <source src={soundSrc}/>

            </audio>
        </span>
    
        <span id="wordsound" style={{cursor:'pointer'}} onClick={fPlay}><img src="volume.png"/></span>
    
        </>
    )


}