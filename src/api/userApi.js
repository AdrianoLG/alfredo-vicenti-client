import { handleResponse, handleError } from './apiUtils';

const baseUrl = process.env.REACT_APP_API_URL;
const baseUrlNoApi = process.env.REACT_APP_URL;
let bearer = localStorage.getItem('access_token');

export async function getUser(userId) {
  return await fetch(`${baseUrl}/user/${userId}`, {
    headers: {
      Authorization: `Bearer ${bearer}`
    }
  })
    .then(handleResponse)
    .catch(handleError);
}

export function userExists(userEmail) {
  return fetch(`${baseUrl}/user/exists`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${bearer}`,
      'content-type': 'application/json'
    },
    body: JSON.stringify({ email: userEmail })
  })
    .then(handleResponse)
    .catch(handleError);
}

export function updateUser(userId, name, email) {
  return fetch(`${baseUrl}/user/${userId}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${bearer}`,
      'content-type': 'application/json'
    },
    body: JSON.stringify({ name: name, email: email })
  })
    .then(handleResponse)
    .catch(handleError);
}

export function updateUserPasswordToken(userId, token) {
  return fetch(`${baseUrl}/user/password-token/${userId}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${bearer}`,
      'content-type': 'application/json'
    },
    body: JSON.stringify({ token: token })
  })
    .then(handleResponse)
    .catch(handleError);
}

export function updateUserPassword(userId, pass, token) {
  return fetch(`${baseUrl}/user/password/${userId}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${bearer}`,
      'content-type': 'application/json'
    },
    body: JSON.stringify({ password: pass, password_update_token: token })
  })
    .then(handleResponse)
    .catch(handleError);
}

export function saveUser(user) {
  return fetch(`${baseUrl}/user/`, {
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

export async function userDataToRetrieveToken(user) {
  return await fetch(`${baseUrl}/user/login`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(user)
  })
    .then(handleResponse)
    .then(response => {
      return getToken(response.data).then(() => response.data);
    })
    .catch(handleError);
}

export async function getToken(userData) {
  localStorage.setItem('access_token', '');
  localStorage.setItem('refresh_token', '');
  return fetch(`${baseUrlNoApi}/oauth/token`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      grant_type: userData.grant_type,
      client_id: userData.client_id,
      client_secret: userData.client_secret,
      username: userData.email,
      password: userData.password
    })
  })
    .then(handleResponse)
    .then(response => {
      localStorage.setItem('access_token', response.access_token);
      localStorage.setItem('refresh_token', response.refresh_token);
      bearer = response.access_token;
    })
    .catch(handleError);
}

export function deleteUser(userId) {
  // TODO
  return fetch(`${baseUrl}/user/`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${bearer}`,
      'content-type': 'application/json'
    }
  })
    .then(handleResponse)
    .catch(handleError);
}
