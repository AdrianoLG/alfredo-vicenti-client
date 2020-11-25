if (process.env.NODE_ENV === 'production') {
  module.exports = require('./configurestore.prod');
} else {
  module.exports = require('./configurestore.dev');
}
