const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const routes = require('./routes')
const server = express()

mongoose.connect(
  'mongodb+srv://omnistack:omnistack@omnistack.pqbnn.mongodb.net/semana10?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

server.use(express.urlencoded({ extended: true }))
server.use(cors())
server.use(express.json())
server.use(routes)

server.listen(3333)

module.exports = server
