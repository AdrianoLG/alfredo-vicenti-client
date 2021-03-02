import { handleResponse, handleError } from './apiUtils';

const baseUrl = process.env.REACT_APP_API_URL;
let bearer = localStorage.getItem('access_token');

export async function getBooks(userId, bear = null) {
  if (bear) {
    bearer = bear;
  }
  return await fetch(`${baseUrl}/books/user/${userId}`, {
    headers: {
      Authorization: `Bearer ${bearer}`
    }
  })
    .then(handleResponse)
    .catch(handleError);
}

export function getGroupBooks(userId, groupId) {
  return fetch(`${baseUrl}/books/group/${groupId}/user/${userId}`, {
    headers: {
      Authorization: `Bearer ${bearer}`
    }
  })
    .then(handleResponse)
    .catch(handleError);
}

export function getBook(bookId, userId) {
  return fetch(`${baseUrl}/book/${bookId}/user/${userId}`, {
    headers: {
      Authorization: `Bearer ${bearer}`
    }
  })
    .then(handleResponse)
    .catch(handleError);
}

export function saveBook(book) {
  return fetch(`${baseUrl}/book/${book.id || ''}`, {
    method: book.id ? 'PUT' : 'POST',
    headers: {
      Authorization: `Bearer ${bearer}`,
      'content-type': 'application/json'
    },
    body: JSON.stringify(book)
  })
    .then(handleResponse)
    .catch(handleError);
}

export function deleteBook(bookId, userId) {
  return fetch(`${baseUrl}/book/${bookId}/user/${userId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${bearer}`,
      'content-type': 'application/json'
    }
  })
    .then(handleResponse)
    .catch(handleError);
}
