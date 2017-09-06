const mongoose = require('mongoose')

const DB_URL = 'mongodb://127.0.0.1:27017/blogdb'

const mongodb = function () {
  mongoose.connect(DB_URL)
  return mongoose.connection
}

module.exports = mongodb

