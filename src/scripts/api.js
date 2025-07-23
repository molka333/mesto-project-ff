const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-42',
  headers: {
    authorization: 'a2ded78d-03d7-483b-8515-9a758e3558f3',
    'Content-Type': 'application/json'
  }
}

const getResponseData = (res) => {
    if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`); 
    }
    return res.json();
}

export const getUser = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
    .then(res => {
      return getResponseData(res);
    })
}

export const pathUser = (data) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify(data.body)
  })
    .then(res => {
      return getResponseData(res);
    })
}

export const pathUserAvatar = (data) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify(data)
  })
    .then(res => {
      return getResponseData(res);
    })
}

export const getCurds = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
    .then(res => {
      return getResponseData(res);
    })
}

export const postCurds = (data) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify(data.body)
  })
    .then(res => {
      return getResponseData(res);
    })
}

export const deleteCurds = (id) => {
  return fetch(`${config.baseUrl}/cards/${id}`, {
    method: 'DELETE',
    headers: config.headers,
  })
    .then(res => {
      return getResponseData(res);
    })
}

export const putLike = (id) => {
  return fetch(`${config.baseUrl}/cards/likes/${id}`, {
    method: 'PUT',
    headers: config.headers,
  })
    .then(res => {
      return getResponseData(res);
    })
}

export const deleteLike = (id) => {
  return fetch(`${config.baseUrl}/cards/likes/${id}`, {
    method: 'DELETE',
    headers: config.headers,
  })
    .then(res => {
      return getResponseData(res);
    })
}