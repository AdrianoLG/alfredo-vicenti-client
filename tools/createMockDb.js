/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');
const mockData = require('./mockData');

const {
  books,
  newBook,
  groups,
  newGroup,
  user,
  newUser,
  groupsUser,
  newGroupUser
} = mockData;
const data = JSON.stringify({
  books,
  newBook,
  groups,
  newGroup,
  user,
  newUser,
  groupsUser,
  newGroupUser
});
const filepath = path.join(__dirname, 'db.json');

fs.writeFile(filepath, data, function (err) {
  err ? console.log(err) : console.log('Mock DB created.');
});
