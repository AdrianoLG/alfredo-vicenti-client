import { handleResponse, handleError } from './apiUtils';

const baseUrl = process.env.REACT_APP_API_URL;
let bearer = localStorage.getItem('access_token');

export function saveGroup(group, groupUserColor, userName) {
  let response = {};
  return fetch(`${baseUrl}/group/`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${bearer}`,
      'content-type': 'application/json'
    },
    body: JSON.stringify(group)
  })
    .then(handleResponse)
    .then(createdGroup => {
      let groupUser = {
        user_id: group.admin,
        group_id: createdGroup.data.id,
        color: groupUserColor
      };
      return fetch(`${baseUrl}/group/user`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${bearer}`,
          'content-type': 'application/json'
        },
        body: JSON.stringify(groupUser)
      })
        .then(handleResponse)
        .then(() => {
          response = {
            id: createdGroup.data.id,
            name: createdGroup.data.name,
            admin: group.admin,
            created_at: createdGroup.data.created_at,
            updated_at: createdGroup.data.updated_at,
            users: [
              {
                name: userName,
                pivot: {
                  group_id: createdGroup.data.id,
                  user_id: group.admin,
                  color: groupUserColor
                }
              }
            ]
          };
          return response;
        })
        .catch(handleError);
    })
    .then(res => {
      return res;
    })
    .catch(handleError);
}

export function changeGroupColor(groupId, userId, color) {
  return fetch(`${baseUrl}/group/user/color`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${bearer}`,
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      group_id: groupId,
      user_id: userId,
      color: color
    })
  }).then(handleResponse);
}

export function deleteGroup(groupId, adminId) {
  return fetch(`${baseUrl}/group/${groupId}/admin/${adminId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${bearer}`,
      'content-type': 'application/json'
    }
  })
    .then(handleResponse)
    .catch(handleError);
}
