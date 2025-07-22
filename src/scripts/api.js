const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-42',
  headers: {
    authorization: 'a2ded78d-03d7-483b-8515-9a758e3558f3',
    'Content-Type': 'application/json'
  }
}

export const getUser = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then(res => {
      return res;
    })
    .catch((err) => {
      console.log(err);
    })
}

export const pathUser = (data, button) => {
  button.textContent = "Сохранение...";
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify(data.body)
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then(res => {
      return res;
    })
    .catch((err) => {
      console.log(err);
    })
}

export const pathUserAvatar = (data, button) => {
  button.textContent = "Сохранение...";
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify(data)
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then(res => {
      return res;
    })
    .catch((err) => {
      console.log(err);
    })
}

export const getCurds = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      } 
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then(res => {
      return res;
    })
    .catch((err) => {
      console.log(err);
    })
}

export const postCurds = (data, button) => {
  button.textContent = "Сохранение...";
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify(data.body)
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then(res => {
      return res;
    })
    .catch((err) => {
      console.log(err);
    })
}

export const deleteCurds = (id) => {
  return fetch(`${config.baseUrl}/cards/${id}`, {
    method: 'DELETE',
    headers: config.headers,
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then(res => {  
      return res;
    })
    .catch((err) => {
      console.log(err);
    })
}

export const putLike = (id) => {
  return fetch(`${config.baseUrl}/cards/likes/${id}`, {
    method: 'PUT',
    headers: config.headers,
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then(res => {
      return res;
    })
    .catch((err) => {
      console.log(err);
    })
}

export const deleteLike = (id) => {
  return fetch(`${config.baseUrl}/cards/likes/${id}`, {
    method: 'DELETE',
    headers: config.headers,
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then(res => {
      return res;
    })
    .catch((err) => {
      console.log(err);
    })
}