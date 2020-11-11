import { bearer } from './tempVariables';
import { handleResponse, handleError } from './apiUtils';
const baseUrl = process.env.REACT_APP_API_URL;

export function getBooks() {
  return fetch(baseUrl + '/books/user/1', {
    headers: {
      Authorization: `Bearer ${bearer}`
    }
  })
    .then(handleResponse)
    .catch(handleError);
}

export function getBook(bookId) {
  return fetch(baseUrl + '/book/' + bookId + '/user/1', {
    headers: {
      Authorization: `Bearer ${bearer}`
    }
  })
    .then(handleResponse)
    .catch(handleError);
}

export function saveBook(book) {
  return fetch(baseUrl + '/book/' + (book.id || ''), {
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

export function deleteBook(bookId) {
  return fetch(baseUrl + bookId, { method: 'DELETE' })
    .then(handleResponse)
    .catch(handleError);
}
