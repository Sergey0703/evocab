import React,{useState} from 'react';
//import firebase from '../firebase';


export const WordStatus =({word, statusTrainF, nameButton,onToggle})=>{
   

    return (
        <>


        <button onClick={()=>onToggle(word,statusTrainF)}>  {nameButton}</button>


        </>
    )
}