import React,{useState} from 'react'
import {useHttp} from '../hooks/http.hook'

export const AuthPage =()=>{
    const {loading, request}=useHttp()
    let [form,setForm]=useState({email:'',password:''})

    const changeHandler=event=>{
        setForm=({...form,[event.target.name]:[event.target.value]})
    }

    const registerHandler=async()=>{
        try {
         const data=await request('/api/auth/register','POST',{...form})
            console.log('Data',data)
        }catch(e){}
    }

    return (
        <div>
            Auth page
            <div>
             <input placeholder="Введите email" type="text" name="email" id="email" onChange={changeHandler} />
             <input placeholder="Введите password" type="text" name="password" id="password" onChange={changeHandler}/>

            </div>
            <div>
            <button stule={{marginRight: 10}}
            disabled={loading}
            > Войти</button>
            <button onClick={registerHandler}
            disabled={loading}
            > Зарегистрироваться</button>
            </div>
        </div>
    )

}