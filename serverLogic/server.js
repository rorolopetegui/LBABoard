const express = require('express')
const cors = require('cors')
const app = express()
const http = require('http')
const server = http.createServer(app)
const { Server } = require('socket.io')
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
})
app.use(cors())

io.on('connection', socket => {
  console.log('Got connection')
  socket.on('addScoreLocal', points => {
    console.log('addScoreToLocal', points)
    io.emit('addScoreToLocal', points)
  })
  socket.on('addScoreVisitor', points => {
    console.log('addScoreToVisitor', points)
    io.emit('addScoreToVisitor', points)
  })
  socket.on('actionPosition', () => {
    console.log('actionPosition')
    io.emit('actionPositionCloak')
  })
  socket.on('actionTime', () => {
    console.log('actionTime')
    io.emit('actionBoard')
  })
  socket.on('addPersonalLocal', points => {
    console.log('addPersonalLocal')
    io.emit('addPersonalToLocal', points)
  })
  socket.on('addPersonalVisitor', points => {
    console.log('addPersonalVisitor')
    io.emit('addPersonalToVisitor', points)
  })
  socket.on('advanceQuarter', () => {
    console.log('advanceQuarter')
    io.emit('advanceQuarterBoard')
  })
  socket.on('setPositionTime', time => {
    console.log('setPositionTime')
    io.emit('setTimePosition', time)
  })
  socket.on('setTeams', teams => {
    console.log('setTeams', teams)
    io.emit('setMatch', teams)
  })
})

server.listen(5000, () => {
  console.log('listening on *:5000')
})
