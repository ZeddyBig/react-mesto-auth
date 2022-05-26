import React from 'react';
import logo from '../images/logo.svg';
import { Link } from 'react-router-dom';

function Header(props) {
    let path = window.location.pathname;
    
    return (
        <header className="header">
            <a href="#" className="header__logo">
                <img src={logo} alt="Логотип" className="header__logo-image"/>
            </a>
            <div className="header__logged-user">
                <p className="header__user-name">{props.email}</p>
                <Link to={props.linkTo} className="header__log-reg-link" onClick={props.handleClick} >{props.buttonName}</Link>
            </div>
        </header>
    )
}

export default Header;