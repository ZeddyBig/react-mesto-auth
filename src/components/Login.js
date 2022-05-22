import React, { Button, useState } from 'react';
import Header from './Header';
import './styles/Login.css';

const Login = (props) => {
    const [formParams, setFormParams] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormParams((prev) => ({
          ...prev,
          [name]: value
        }));
    }

    return(
        <div className="page login">
            <Header />
            
            <form className="login__form">
                <div className="login__top">
                    <h2 className="login__header">
                        Вход
                    </h2>
                    <input id="email" name="email" placeholder="Email" type="email" value={formParams.email} onChange={handleChange} />
                    <input id="password" name="password" placeholder="Пароль" type="password" value={formParams.password} onChange={handleChange} />
                </div>
                <div className="login__bottom">
                    <div className="login__button-container">
                        <button type="submit" className="login__link">Войти</button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Login;