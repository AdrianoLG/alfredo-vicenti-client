import { handleResponse, handleError } from './apiUtils';
const baseUrl = process.env.REACT_APP_API_URL;
const baseUrlNoApi = process.env.REACT_APP_URL;
const bearer = localStorage.getItem('access_token');

export function getUser(userId) {
  return fetch(baseUrl + '/user/' + userId, {
    headers: {
      Authorization: `Bearer ${bearer}`
    }
  })
    .then(handleResponse)
    .catch(handleError);
}

export function saveUser(user) {
  return fetch(baseUrl + '/user/', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${bearer}`,
      'content-type': 'application/json'
    },
    body: JSON.stringify(user)
  })
    .then(handleResponse)
    .catch(handleError);
}

export function loginUser(user) {
  return fetch(baseUrl + '/user/login', {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(user)
  })
    .then(handleResponse)
    .then(response => {
      getToken(response);
      return response;
    })
    .catch(handleError);
}

export function getToken(userData) {
  return fetch(baseUrlNoApi + '/oauth/token', {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      grant_type: userData.data.grant_type,
      client_id: userData.data.client_id,
      client_secret: userData.data.client_secret,
      username: userData.data.email,
      password: userData.data.password
    })
  })
    .then(handleResponse)
    .then(response => {
      localStorage.setItem('access_token', response.access_token);
      localStorage.setItem('refresh_token', response.refresh_token);
    })
    .catch(handleError);
}

export function deleteUser(userId) {
  // TODO
  return fetch(baseUrl + '/user/', {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${bearer}`,
      'content-type': 'application/json'
    }
  })
    .then(handleResponse)
    .catch(handleError);
}
