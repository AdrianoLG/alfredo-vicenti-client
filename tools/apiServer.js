const jsonServer = require('json-server');
const server = jsonServer.create();
const path = require('path');
const router = jsonServer.router(path.join(__dirname, 'db.json'));

const middlewares = jsonServer.defaults({
  static: 'node_modules/json-server/dist'
});

server.use(middlewares);

server.use(jsonServer.bodyParser);

server.use(function (req, res, next) {
  setTimeout(next, 0);
});

server.post('/books', function (req, res, next) {
  const error = validateBook(req.body);
  if (error) {
    res.status(400).send(error);
  } else {
    req.body.slug = createSlug(req.body.title);
    next();
  }
});

server.post('/user', function (req, res, next) {
  const error = validateUser(req.body);
  if (error) {
    res.status(400).send(error);
  } else {
    req.body.slug = createSlug(req.body.title);
    next();
  }
});

server.post('/groups', function (req, res, next) {
  const error = validateGroup(req.body);
  if (error) {
    res.status(400).send(error);
  } else {
    req.body.slug = createSlug(req.body.name);
    next();
  }
});

server.post('/groupsUser', function (req, res, next) {
  const error = validateGroupsUser(req.body);
  if (error) {
    res.status(400).send(error);
  } else {
    req.body.slug = createSlug(req.body.color);
    next();
  }
});

server.use('/api', router);

const port = 3001;
server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`);
});

function createSlug(value) {
  return value
    .replace(/[^a-z0-9_]+/gi, '-')
    .replace(/^-|-$/g, '')
    .toLowerCase();
}

function validateBook(book) {
  if (!book.title) return 'Title is required.';
  if (!book.author) return 'Author is required.';
  if (!book.category) return 'Category is required.';
  return '';
}

function validateUser(user) {
  if (!user.name) return 'Name is required.';
  if (!user.email) return 'Email is required.';
  if (!user.password) return 'Password is required.';
  return '';
}

function validateGroup(group) {
  if (!group.name) return 'Name is required.';
  if (!group.admin) return 'Admin is required.';
  return '';
}

function validateGroupsUser(groupsUser) {
  if (!groupsUser.user_id) return 'User_id is required.';
  if (!groupsUser.group_id) return 'Group_id is required.';
  return '';
}
