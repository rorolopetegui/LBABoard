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
  socket.on('addScoreLocal', points => {
    console.log('addScoreToLocal', points)
    socket.emit('addScoreToLocal', points)
  })
  socket.on('addScoreVisitor', points => {
    console.log('addScoreToVisitor', points)
    socket.emit('addScoreToVisitor', points)
  })
  socket.on('pauseTime', () => {
    console.log('pauseTime')
    socket.emit('pauseBoard')
  })
  socket.on('pausePosition', () => {
    console.log('pausePosition')
    socket.emit('pausePositionCloak')
  })
  socket.on('continueTime', () => {
    console.log('continueTime')
    socket.emit('continueBoard')
  })
  socket.on('continuePosition', () => {
    console.log('continuePosition')
    socket.emit('continuePositionCloak')
  })
})

server.listen(5000, () => {
  console.log('listening on *:5000')
})
