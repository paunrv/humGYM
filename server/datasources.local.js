'use strict';
var mongoUri = process.env.MONGOLAB_URI ||
  process.env.MONGOHQ_URL ||
  'mongodb://localhost:27017/mydb';

module.exports = {
  db: {
    defaultForType: 'mongodb',
    connector: 'loopback-connector-mongodb',
    url: mongoUri
  }};