import React, { Button, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import './styles/Register.css';

const Register = (props) => {
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
        <div className="page register">
            <Header />
            
            <form className="register__form">
                <div className="register__top">
                    <h2 className="register__header">
                        Регистрация
                    </h2>
                    <input id="email" name="email" placeholder="Email" type="email" value={formParams.email} onChange={handleChange} />
                    <input id="password" name="password" placeholder="Пароль" type="password" value={formParams.password} onChange={handleChange} />
                </div>
                <div className="register__bottom">
                    <div className="register__button-container">
                        <button type="submit" className="register__link">Зарегистрироваться</button>
                    </div>
                    <div className="register__signin">
                        <p>Уже зарегистрированы?</p>
                        <Link to="/signin" className="register__login-link">Войти</Link>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Register;