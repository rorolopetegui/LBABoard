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

app.get('/teams', (req, res) => {
  // TODO HAY QUE MEJORAR ESTO, PARA QUE SE CARGUEN LAS IMAGENES TAMBIEN
  res.send(lbaTeams)
})

const lbaTeams = [
  'Are-Pora',
  'Carolino',
  'Dynamo BBC',
  'Panteras BBC',
  'Peor Es Casarse',
  'Stoners',
]

let teamLocal = lbaTeams[0]
let teamVisitor = lbaTeams[1]
let scoreLocal = 0
let scoreVisitor = 0

io.on('connection', socket => {
  console.log('Got connection')
  socket.emit('match', [teamLocal, teamVisitor])

  socket.on('addScoreLocal', points => {
    console.log('addScoreToLocal', points)
    scoreLocal += points
    io.emit('addScoreToLocal', scoreLocal)
  })
  socket.on('addScoreVisitor', points => {
    console.log('addScoreToVisitor', points)
    scoreVisitor += points
    io.emit('addScoreToVisitor', scoreVisitor)
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
    teamLocal = teams[0]
    teamVisitor = teams[1]
    scoreLocal = 0
    scoreVisitor = 0
    io.emit('setMatch', teams)
  })
})

server.listen(5000, () => {
  console.log('listening on *:5000')
})
