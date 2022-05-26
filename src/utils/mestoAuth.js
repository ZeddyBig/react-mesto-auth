export const BASE_URL = 'https://auth.nomoreparties.co';

const checkResponse = (res) => {
    if (res.ok) {
      return res.json();
    }
  
    return res.json().then((data) => {
        console.log("inApi", data);
        throw new Error(data.message);
    });
};

export const register = (email, password) => {
    return fetch(`${BASE_URL}/signup`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({email, password})
    })
    .then(checkResponse)
};

export const authorize = (email, password) => {
    return fetch(`${BASE_URL}/signin`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json" 
      },
      body: JSON.stringify({email, password})
    })
    .then(checkResponse)
};

export const getContent = (jwt) => {
    return fetch(`${BASE_URL}/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`
      }
    })
    .then(checkResponse)
}