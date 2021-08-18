process.env.NODE_ENV = 'test';

module.exports = {
  file: ['test/setup.js'],
  require: '@babel/register',
  ui: "bdd",
  timeout: 1000,
  fullTrace: true,
  recursive: true,
  exit: true,
  bail: true
}
