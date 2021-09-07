const express = require("express")
const helmet = require('helmet')
const {logger} = require('./middleware')
const carsRouter = require('./cars/cars-router')

const server = express()

server.use(express.json())
server.use(helmet())
server.use('/api/cars', logger, carsRouter)

server.get('*', (req, res) => {
  res.send(`<h1>What's the password?</h1>`)
})

module.exports = server
