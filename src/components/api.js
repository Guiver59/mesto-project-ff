const config = {
  baseUrl: 'https://nomoreparties.co/v1/',
  cohort: 'wff-cohort-42',  
  headers: {
    authorization: 'dfa01cca-f526-4211-b10c-315f5c36e22b',
    'Content-Type': 'application/json'
  }
}

const checkResult = (res)=>
  {
    if(res.ok)
      {
        return res.json()
      }
      else
      {        
        return Promise.reject(`Ошибка: ${res.status}`);
      }
  }

const loadUserInfo = ()=> {
  return fetch(`${config.baseUrl}${config.cohort}/users/me`, {
    headers:{
      authorization: config.headers.authorization
    }
  })
    .then((res)=>
      {
        return checkResult(res);
      })
    .then((json)=>{
      return json;
    })
    .catch((err)=>{console.log(err)});  
} 

const loadCards = ()=>{
  return fetch(`${config.baseUrl}${config.cohort}/cards`, {
    headers:{
      authorization: config.headers.authorization
    }
  })
    .then((res)=>{
      return checkResult(res);
    })
    .then((json)=>{
      return json;
    })
    .catch((err)=>{console.log(err)});
}

const saveUserInfo = (userInfo)=> {
  return fetch(`${config.baseUrl}${config.cohort}/users/me`, {
    method: 'PATCH',
    headers: {
      authorization: config.headers.authorization,
      'Content-Type': config.headers['Content-Type']
    },
    body: JSON.stringify({
      name: userInfo.name,
      about: userInfo.about
    })
  })
    .then((res)=> {
      return checkResult(res);
    })
    .catch((err)=>{
      console.log(err)
    }); 
}

const addCard = (newCard) => {
  return fetch(`${config.baseUrl}${config.cohort}/cards`, {
    method: 'POST',
    headers: {
      authorization: config.headers.authorization,
      'Content-Type': config.headers['Content-Type']
    },
    body: JSON.stringify({
      name: newCard.name,
      link: newCard.link
    })
  })
    .then((res)=>{
      return checkResult(res);
    })
    //.then((json)=>{console.log(json);})
    .catch((err)=>{console.log(err)}); 
}

const deleteCard = (card) =>{
   return fetch(`${config.baseUrl}${config.cohort}/cards/${card._id}`, {
      method: 'DELETE',
      headers:{
        authorization: config.headers.authorization
      }
    }
   )
   .then((res)=>{
    return checkResult(res);
   })
   .catch((err)=>{console.log(err)}); 
}

const likeCard = (card) => {
  return fetch(`${config.baseUrl}${config.cohort}/cards/likes/${card._id}`, {
          method: 'PUT',
          headers:{
            authorization: config.headers.authorization
          }
        }
      )
      .then((res)=>{
        return checkResult(res);
      })
      .catch((err)=>{console.log(err)}); 
}

const unlikeCard = (card) => {
  return fetch(`${config.baseUrl}${config.cohort}/cards/likes/${card._id}`, {
        method: 'DELETE',
        headers:{
          authorization: config.headers.authorization
        }
      }
    )
    .then((res)=>{
      return checkResult(res);
    })
    .catch((err)=>{console.log(err)}); 
}

const updateAvatar = (newAvatar)=>{
  return fetch(`${config.baseUrl}${config.cohort}/users/me/avatar`, {
    method: 'PATCH',
    headers:{
      authorization: config.headers.authorization,
      'Content-Type': config.headers['Content-Type']
    },
    body: JSON.stringify({
      avatar: newAvatar
    })
  })
    .then((res)=>
      {
        return checkResult(res);
      })
    .then((json)=>{
      return json;
    })
    .catch((err)=>{console.log(err)});  
}

export {loadUserInfo, loadCards, saveUserInfo, addCard, deleteCard, likeCard, unlikeCard, updateAvatar}