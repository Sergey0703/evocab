import React from 'react'

export const WordCard = ({ word,onToggle }) => {
  return (
    <>
      <h2>{word.word}</h2>

      <p>Word: <a href={word.word} target="_blank" rel="noopener noreferrer">{word.translate}</a></p>
      <p>Дата создания: <strong>{new Date(word.trainDate).toLocaleDateString()}</strong></p>
      <button onClick={()=>onToggle(word,false)}>  Study</button>
      <button onClick={()=>onToggle(word,true)}>  I know</button>
    </>
  )
}