import React, {useEffect,useState} from 'react';

export const WordSound =({sound})=>{

    let [wordAudio, setWordAudio]=useState();
    let [soundSrc,setSoundSrc]=useState();
    let [wSound, setwSound]=useState();
    //let
    useEffect(()=>{
     // console.log('WordSounduseEffect')
        wordAudio=document.getElementById('wordAudio');
        wSound=document.getElementById('wordsound');
       
        wSound.addEventListener('click', fPlay, false);
        setwSound(wSound);
       // wordAudio=wordAudio.replace({'sound':''});
       setWordAudio (wordAudio);
      
    soundSrc=sound.replace('sound','');
    soundSrc=soundSrc.replace('[','');
    soundSrc=soundSrc.replace(']','');
    soundSrc=soundSrc.replace(':','');
    setSoundSrc(soundSrc);
    //let ChirpChirp = new Audio (soundSrc);
    },[sound]);

    const fPlay=() =>{
        const ChirpChirp = new Audio (soundSrc);
        ChirpChirp.play();
        console.log('fplay',ChirpChirp)
       // console.log('fPlay',wordAudio)
       // console.log('sound',soundSrc)
       // wordAudio.play()
    }
//console.log('before WordSound')
//<source src={ word.sound.replace({'sound:': ""}) } type="audio/mpeg"/>
    
    console.log('src=',soundSrc);
    return(
    <>
        
        <span className="myclass1">
            <audio id='wordAudio'>
                <source src={soundSrc}/>

            </audio>
        </span>
    
        <span id="wordsound" style={{cursor:'pointer'}} onClick={()=>fPlay()}><img src="volume.png"/></span>
        
        </>
    )


}