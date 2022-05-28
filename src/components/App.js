import React, { useEffect, useState } from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Main from './Main'; 
import PopupWithForm from './PopupWithForm'; 
import ImagePopup from './ImagePopup';
import {api} from '../utils/api';
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ProtectedRoute from './ProtectedRoute';
import Login from './Login';
import Register from './Register';
import InfoTooltip from './InfoTooltip';
import * as mestoAuth from '../utils/mestoAuth';

const App = () => {

  const [currentUser, setCurrentUser] = useState({});

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [cards, setCards] = useState([]);
// Спринт 12
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const history = useNavigate();
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [message, setMessage] = useState({ success: false, message: "" });

  useEffect(() => {
    api.getUserInfo()
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((err) => console.log(err));
    
    api.getInitialCards()
    .then ((res) => {
      const cardInfo = res.map((cardData) => {
        return {
          name: cardData.name,
          link: cardData.link,
          likes: cardData.likes,
          _id: cardData._id,
          owner: {
            _id: cardData.owner._id
          }
        }
      })
      setCards(cardInfo);
    })
    .catch((err) => console.log(err));

  }, []);


  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setIsImagePopupOpen(true);
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
  }

  function handleUpdateUser(info) {
    api.editProfile(info)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateAvatar(obj) {
    api.updateAvatar(obj)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleAddCard(obj) {
    api.addCard(obj)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  // Из Main.js

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, isLiked)
    .then((newCard) => {
      setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
    })
    .catch((err) => console.log(err));
  }

  function handleCardDelete(cardToBeDeleted) {
    api.deleteCard(cardToBeDeleted._id)
    .then((res) => {
      setCards((state) => state.filter((c) => c._id !== cardToBeDeleted._id));
    })
    .catch((err) => console.log(err));
  }
  // Из Main.js конец
  // Спринт 12

  const handleLogin = ({ email, password }) => {
    return mestoAuth.authorize(email, password)
        .then((data) => {
          if (data.token) {
            localStorage.setItem('jwt', data.token);
            
            tokenCheck();
          }
        })
        .catch((err) => {
          setMessage({
            successful: false,
            message: "Что-то пошло не так! Попробуйте ещё раз.",
          });
          setIsInfoTooltipOpen(true);
        });
  }

  const handleRegister = ({ email, password }) => {
    return mestoAuth.register(email, password).then((res) => {
      if (res) {
        setMessage({
          success: true,
          message: "Вы успешно зарегистрировались!",
        });
        setIsInfoTooltipOpen(true);
        history('/signin');
      }
    })
    .catch((err) => {
      setMessage({
        successful: false,
        message: "Что-то пошло не так! Попробуйте ещё раз.",
      });
      setIsInfoTooltipOpen(true);
    });
  }

  const tokenCheck = () => {
    if (localStorage.getItem('jwt')){
      const jwt = localStorage.getItem('jwt');
      mestoAuth.getContent(jwt).then((data) => {
        if (data){
          let userData = {
            email: data.data.email
          }
          history("/");
          setLoggedIn(true);
          setEmail(userData.email);
        }
      })
      .catch((err) => console.log(err));
    }
  }

  const signOut = () => {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    setEmail("");
    history('/register');
  }

  useEffect(() => {
    tokenCheck();
  }, []);

  useEffect(() => {
    if (loggedIn) {
        history("/");
    }
  }, [loggedIn]);

  function closeInfoTooltip() {
    setIsInfoTooltipOpen(false);
  }

  return (
    <div className="App">
      <CurrentUserContext.Provider value={currentUser}>
        <div className="page">
          <Routes>
            <Route path="/" element={
                <ProtectedRoute loggedIn={loggedIn}>

                <Header buttonName={"Выйти"} handleClick={signOut} email={email} linkTo={"/signin"}/>
                  <Main 
                    onEditAvatar={handleEditAvatarClick} 
                    onEditProfile={handleEditProfileClick}
                    onAddPlace={handleAddPlaceClick} 
                    onCardClick={handleCardClick}
                    cards={cards}
                    onCardLike={handleCardLike}
                    onCardDelete={handleCardDelete}
                  />
                <Footer/>
              </ProtectedRoute>
            } />

            <Route path="/signin" element={
              <Login handleLogin={handleLogin} buttonName={"Регистрация"} handleClick={''} linkTo={"/signup"}/>
            } />
              
            <Route path="/signup" element={
              <Register handleRegister={handleRegister} buttonName={"Войти"} handleClick={''} linkTo={"/signin"}/>
            }/>

            <Route exact path="/" loggedIn={loggedIn} element={
              loggedIn ? <Navigate to="/" /> : <Navigate to="/signin" />
            }/>
          </Routes>

          <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />

          <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />

          <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddCard={handleAddCard} />

          <PopupWithForm name={'delete-confirm'} title='Вы уверены?' buttonName={'Да'}/>

          <ImagePopup card={selectedCard} isOpen={isImagePopupOpen} onClose={closeAllPopups} />

          <InfoTooltip name={'info-tooltip'} isOpen={isInfoTooltipOpen} onClose={closeInfoTooltip} message={message.message} success={message.success}/>

        </div>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
