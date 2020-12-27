import React,{useState} from 'react'

export const AuthPage =()=>{
    const [form,setForm]=useState({email:'',password:''})
    const changeHandler=event=>{
        setForm=({...form,[event.target.name]:[event.target.value]})
    }

    return (
        <div>
            Auth page
            <div>
             <input placeholder="Введите email" type="text" name="email" id="email" onChange={changeHandler} />
             <input placeholder="Введите password" type="text" name="password" id="password" onChange={changeHandler}/>

            </div>
            <div>
            <button stule={{marginRight: 100}}> Войти</button>
            <button> Зарегистрироваться</button>
            </div>
        </div>
    )

}