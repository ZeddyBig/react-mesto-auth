import React, { useState } from 'react';
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

    const handleSubmit = (e) => {
        e.preventDefault();
        let { email, password  } = formParams;
        props.handleRegister({ email, password });
    }

    return(
        <div className="page register">
            <Header buttonName={props.buttonName} handleClick={props.handleClick} linkTo={props.linkTo}/>
            
            <form className="register__form" onSubmit={handleSubmit}>
                <div className="register__top">
                    <h2 className="register__header">
                        Регистрация
                    </h2>
                    <input id="email" name="email" placeholder="Email" type="email" value={formParams.email} onChange={handleChange} required />
                    <input id="password" name="password" placeholder="Пароль" type="password" value={formParams.password} onChange={handleChange} required />
                </div>
                <div className="register__bottom">
                    <div className="register__button-container">
                        <button type="submit" className="register__link">Зарегистрироваться</button>
                    </div>
                    <div className="register__signin">
                        <p>Уже зарегистрированы?</p>
                        <Link to={props.linkTo} className="register__login-link">Войти</Link>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Register;