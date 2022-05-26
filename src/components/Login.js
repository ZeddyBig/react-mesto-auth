import React, { Button, useState } from 'react';
import Header from './Header';
import './styles/Login.css';

const Login = (props) => {
    const [formParams, setFormParams] = useState({
        email: '',
        password: '',
    });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormParams((prev) => ({
          ...prev,
          [name]: value
        }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        props.handleLogin({ email: formParams.email, password: formParams.password })
            .catch(err => {
              setMessage(err.message);
            });
    }

    return(
        <div className="page login">
            <Header buttonName={props.buttonName} handleClick={props.handleClick} linkTo={props.linkTo}/>
            
            <form className="login__form" onSubmit={handleSubmit}>
                <div className="login__top">
                    <h2 className="login__header">
                        Вход
                    </h2>
                    <input id="email" name="email" placeholder="Email" type="email" value={formParams.email} onChange={handleChange} required />
                    <input id="password" name="password" placeholder="Пароль" type="password" value={formParams.password} onChange={handleChange} required />
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