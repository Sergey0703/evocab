import React, {useContext, useEffect, useState} from 'react'
import {useHttp} from '../hooks/http.hook'
import {useMessage} from '../hooks/message.hook'
import {AuthContext} from '../context/AuthContext'

export const AuthPage = () => {
    const auth = useContext(AuthContext)
    const message = useMessage()
    const {loading, request, error, clearError} = useHttp()
    const [form, setForm] = useState({
        email: '', password: ''
    })

   useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    useEffect(() => {
  //      window.M.updateTextFields()
    }, [])

    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', {...form})
            message(data.message)
        } catch (e) {}
    }

    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', {...form})
            auth.login(data.token, data.userId)
        } catch (e) {}
    }

    return (
        <div >
            <div >
             
                         
                        <h2>Авторизация</h2>
                      
                        <div>

                        <div class="form-group">
                        <label htmlFor="email">Email address</label>
                                <input
                                    placeholder="Введите email"
                                    id="email"
                                    type="text"
                                    name="email"
                                    className="form-control"
                                    value={form.email}
                                    onChange={changeHandler}
                                />
                              </div>

                              <div class="form-group">
                              <label htmlFor="password">Password</label>
                                <input
                                    placeholder="Введите пароль"
                                    id="password"
                                    type="password"
                                    name="password"
                                    className="form-control"
                                    value={form.password}
                                    onChange={changeHandler}
                                />
                                
                            </div>

                        </div>
                    
                    <div className="card-action">
                        <button
                            onClick={loginHandler}
                            className="btn btn-success"
                                                                                
                        >
                             { /* disabled={loading} */ }
                            Войти
                        </button>
                        <button
                            onClick={registerHandler}
                            disabled={loading}
                            className="btn btn-primary"
                        >
                            Регистрация
                        </button>
                    </div>
              
            </div>
        </div>
    )
}