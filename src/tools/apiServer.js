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
  if (!book.title) return 'El título es necesario.';
  if (!book.author) return 'El autor es necesario.';
  if (!book.category) return 'La categoría es necesaria.';
  return '';
}

function validateUser(user) {
  if (!user.name) return 'El nombre es necesario.';
  if (!user.email) return 'El email es necesario.';
  if (!user.password) return 'La contraseña es necesaria.';
  return '';
}

function validateGroup(group) {
  if (!group.name) return 'El nombre es necesario.';
  if (!group.admin) return 'El admin es necesario.';
  return '';
}

function validateGroupsUser(groupsUser) {
  if (!groupsUser.user_id) return 'El user_id es necesario.';
  if (!groupsUser.group_id) return 'El group_id es necesario.';
  return '';
}
