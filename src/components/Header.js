import React from 'react';
import logo from '../images/logo.svg';
import { Link } from 'react-router-dom';

function Header() {
    let path = window.location.pathname;
    let linkTo = "/";
    let linkText = "Войти";

    if (path === "/signin") {
        linkTo = "/signup";
        linkText = "Регистрация";
    } else {
        if (path === "/signup") {
            linkTo = "/signin";
            linkText = "Войти";
        }
    }

    return (
        <header className="header">
            <a href="#" className="header__logo">
                <img src={logo} alt="Логотип" className="header__logo-image"/>
            </a>
            
            <Link to={linkTo} className="header__log-reg-link">{linkText}</Link>
            {console.log('CYKA BLYAT')}
        </header>
    )
}

export default Header;