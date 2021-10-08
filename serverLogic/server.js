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

const initialPositionTime = 24.9 * 1000
const initialMatchTime = 600000

// Initial state
let teamLocal = lbaTeams[0]
let teamVisitor = lbaTeams[1]
let scoreLocal = 0
let scoreVisitor = 0
let matchTimer = false
let positionTimer = false
let positionTime = initialPositionTime
let matchTime = initialMatchTime
let quarter = 0

const getMatchStats = () => ({
  teamLocal,
  teamVisitor,
  scoreLocal,
  scoreVisitor,
  matchTimer,
  positionTimer,
  positionTime,
  matchTime,
  quarter,
})
console.log('getMatchStats', getMatchStats())

let intervalPosition = null
let intervalMatch = null

const activatePositionTime = () => {
  // TODO chequear por el el reloj no esta corriendo "bien"
  if (positionTimer && positionTime > 0) {
    intervalPosition = setInterval(() => {
      if (positionTime <= 0) {
        clearInterval(intervalPosition)
        io.emit('actionPositionCloak', false)
      } else {
        positionTime -= 10
      }
    }, 10)
  } else {
    io.emit('actionPositionCloak', false)
    clearInterval(intervalPosition)
  }
}

io.on('connection', socket => {
  console.log('Got connection')
  socket.emit('match', getMatchStats())
  io.emit('setTime', matchTime)

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
    positionTimer = positionTime <= 0 ? false : !positionTimer
    activatePositionTime()
    io.emit('actionPositionCloak', positionTimer)
  })
  socket.on('actionTime', () => {
    console.log('actionTime')
    matchTimer = !matchTimer
    io.emit('actionBoard', matchTimer)
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
    clearInterval(intervalPosition)
    matchTimer = false
    positionTimer = false
    positionTime = initialPositionTime
    matchTime = initialMatchTime
    quarter = quarter > 2 ? 0 : quarter + 1
    io.emit('advanceQuarterBoard', quarter)
    io.emit('setTimePosition', positionTime)
    io.emit('setTime', matchTime)
    io.emit('actionBoard', matchTimer)
  })
  socket.on('setPositionTime', time => {
    console.log('setPositionTime')
    positionTime = time
    io.emit('setTimePosition', positionTime)
    positionTimer = true
    io.emit('actionPositionCloak', positionTimer)
    activatePositionTime()
  })
  socket.on('setMatchTime', time => {
    console.log('setMatchTime')
    io.emit('setTime', time * 600)
    matchTimer = false
    io.emit('actionBoard', matchTimer)
  })
  socket.on('setTeams', teams => {
    console.log('setTeams', teams)
    teamLocal = teams[0]
    teamVisitor = teams[1]
    scoreLocal = 0
    scoreVisitor = 0
    io.emit('setMatch', teams)
    matchTimer = false
    io.emit('actionBoard', matchTimer)
  })
})

server.listen(5000, () => {
  console.log('listening on *:5000')
})
