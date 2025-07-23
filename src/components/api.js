const config = {
  baseUrl: "https://nomoreparties.co/v1/",
  cohort: "wff-cohort-42",
  headers: {
    authorization: "dfa01cca-f526-4211-b10c-315f5c36e22b",
    "Content-Type": "application/json",
  },
};

const checkResult = (res) => {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
};

const loadUserInfo = () => {
  return fetch(`${config.baseUrl}${config.cohort}/users/me`, {
    headers: {
      authorization: config.headers.authorization,
    },
  })
    .then(checkResult);
};

const loadCards = () => {
  return fetch(`${config.baseUrl}${config.cohort}/cards`, {
    headers: {
      authorization: config.headers.authorization,
    },
  })
    .then(checkResult);
};

const saveUserInfo = (userInfo) => {
  return fetch(`${config.baseUrl}${config.cohort}/users/me`, {
    method: "PATCH",
    headers: {
      authorization: config.headers.authorization,
      "Content-Type": config.headers["Content-Type"],
    },
    body: JSON.stringify({
      name: userInfo.name,
      about: userInfo.about,
    }),
  })
    .then(checkResult);
};

const addCard = (newCard) => {
  return (
    fetch(`${config.baseUrl}${config.cohort}/cards`, {
      method: "POST",
      headers: {
        authorization: config.headers.authorization,
        "Content-Type": config.headers["Content-Type"],
      },
      body: JSON.stringify({
        name: newCard.name,
        link: newCard.link,
      }),
    })
      .then(checkResult)
  );
};

const deleteCard = (card) => {
  return fetch(`${config.baseUrl}${config.cohort}/cards/${card._id}`, {
    method: "DELETE",
    headers: {
      authorization: config.headers.authorization,
    },
  })
    .then(checkResult);
};

const likeCard = (card) => {
  return fetch(`${config.baseUrl}${config.cohort}/cards/likes/${card._id}`, {
    method: "PUT",
    headers: {
      authorization: config.headers.authorization,
    },
  })
    .then(checkResult);
};

const unlikeCard = (card) => {
  return fetch(`${config.baseUrl}${config.cohort}/cards/likes/${card._id}`, {
    method: "DELETE",
    headers: {
      authorization: config.headers.authorization,
    },
  })
    .then(checkResult);
};

const updateAvatar = (newAvatar) => {
  return fetch(`${config.baseUrl}${config.cohort}/users/me/avatar`, {
    method: "PATCH",
    headers: {
      authorization: config.headers.authorization,
      "Content-Type": config.headers["Content-Type"],
    },
    body: JSON.stringify({
      avatar: newAvatar,
    }),
  })
    .then(checkResult);
};

export {
  loadUserInfo,
  loadCards,
  saveUserInfo,
  addCard,
  deleteCard,
  likeCard,
  unlikeCard,
  updateAvatar,
};
