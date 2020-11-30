const books = [
  {
    id: 1,
    title: 'A Project Guide To UX Design',
    author: 'Russ Unger and Carolyn Chandler',
    category: 'Diseño gráfico'
  },
  {
    id: 2,
    title: 'Acerca del alma',
    author: 'Aristóteles',
    category: 'Filosofía'
  },
  {
    id: 3,
    title: 'Adolescencia y cultura en Samoa',
    author: 'Margaret Mead',
    category: 'Antropología'
  },
  {
    id: 4,
    title: 'Android - Guía para desarrolladores',
    author: 'W. Frank Ableson, Robin Sen & Chris King',
    category: 'Código'
  },
  {
    id: 5,
    title: 'Angular 6 for Enterprise-Ready Web Applications',
    author: 'Doguhan Uluca',
    category: 'Código'
  },
  {
    id: 6,
    title: 'Atlas histórico mundial',
    author: 'Georges Duby',
    category: 'Historia'
  },
  {
    id: 7,
    title: 'Bienvenidos al desierto de lo real',
    author: 'Slavoj Zizek',
    category: 'Filosofía'
  },
  {
    id: 8,
    title:
      'Ciudad y ciudadanía: Senderos contemporáneos de la filosofía política',
    author: 'Fernando Quesada',
    category: 'Filosofía'
  },
  {
    id: 9,
    title: 'Collins Pocket Plus - Español/Inglés, English/Spanish',
    author: 'Collins',
    category: 'Diccionario'
  },
  {
    id: 10,
    title: 'Confucio en 90 minutos',
    author: 'Paul Strathern',
    category: 'Filosofía'
  }
];

const groups = [
  {
    id: 1,
    name: 'Club de lectura',
    admin: 1
  },
  {
    id: 2,
    name: 'Familia',
    admin: 2
  }
];

const user = [
  {
    id: 1,
    name: 'Adri',
    email: 'adri@adri.info',
    password: '12345',
    shared_comments: 1,
    shared_ratings: 1
  },
  {
    id: 1,
    name: 'Manolo',
    email: 'manolo@gmail.com',
    password: '12345',
    shared_comments: 0,
    shared_ratings: 0
  }
];

const groupsUser = [
  {
    id: 1,
    user_id: 1,
    group_id: 1,
    color: 'F27F10'
  },
  {
    id: 2,
    user_id: 2,
    group_id: 1,
    color: 'FEFEFE'
  },
  {
    id: 3,
    user_id: 1,
    group_id: 2,
    color: 'FEFEFE'
  }
];

const newBook = {
  id: null,
  user_id: 1, // TODO
  title: '',
  author: '',
  category: '',
  pages: null,
  editorial: '',
  synopsis: '',
  image: '',
  read_date: '',
  comments: '',
  rating: null,
  lent_to: '',
  lent_date: ''
};

const newGroup = {
  id: 0,
  name: null,
  admin: 0
};

const newUser = {
  id: 0,
  name: null,
  email: null,
  password: null,
  shared_comments: 1,
  shared_ratings: 1
};

const newGroupUser = {
  id: 0,
  user_id: 0,
  group_id: 0,
  color: null
};

// Using CommonJS style export so we can consume via Node (without using Babel-node)
module.exports = {
  books,
  newBook,
  groups,
  newGroup,
  user,
  newUser,
  groupsUser,
  newGroupUser
};
