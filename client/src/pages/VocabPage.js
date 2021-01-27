import React, {useContext, useEffect, useState} from 'react'
import {useHttp} from '../hooks/http.hook'
import {AuthContext} from '../context/AuthContext'
import {useHistory} from 'react-router-dom'

export const VocabPage = () => {
  const history = useHistory()
  const auth = useContext(AuthContext)
  const {request} = useHttp()
  const [word, setWord] = useState('')

  useEffect(() => {
   // window.M.updateTextFields()
  }, [])

  const pressHandler = async event => {
    if (event.key === 'Enter') {
      try {
        const data = await request('/api/vocab/add', 'POST', {from: word}, {
          Authorization: `Bearer ${auth.token}`
        })
      //  history.push(`/detail/${data.word._id}`)
      } catch (e) {}
    }
  }

  return (
      
    <div className="row">
        
      <div className="col s8 offset-s2">
        <div className="input-field">
          <input
            placeholder="Вставьте слово"
            id="word"
            type="text"
            value={word}
            onChange={e => setWord(e.target.value)}
            onKeyPress={pressHandler}
          />
          <label htmlFor="word">Введите слово</label>
        </div>
      </div>
    </div>
  )
}