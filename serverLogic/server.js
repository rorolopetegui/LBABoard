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
app.get('/', (req, res) => {
  res.json(matchState)
})

const matchState = {
  scoreLocal: 0,
  scoreVisitor: 0,
  positionCloak: 24,
  match: 10,
}

const resetMatchState = () => {
  matchState.scoreLocal = 0
  matchState.scoreVisitor = 0
  matchState.positionCloak = 24
  matchState.match = 10
}

io.on('connection', socket => {
  socket.on('initialize', () => {
    console.log('initialize')
    resetMatchState()
  })
  socket.on('addScoreLocal', points => {
    console.log('addScoreLocal', points)
    matchState.scoreLocal += points
    socket.emit('updateBoard', matchState)
  })
  socket.on('addScoreVisitor', points => {
    console.log('addScoreVisitor', points)
    matchState.scoreVisitor += points
    socket.emit('updateBoard', matchState)
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
