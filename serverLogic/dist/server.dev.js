const express = require('express')

const cors = require('cors')

const app = express()

const http = require('http')

const server = http.createServer(app)

const _require = require('socket.io')
const { Server } = _require

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
})
app.use(cors())
app.get('/teams', function(req, res) {
  // TODO HAY QUE MEJORAR ESTO, PARA QUE SE CARGUEN LAS IMAGENES TAMBIEN
  res.send(lbaTeams)
})
var lbaTeams = [
  'Are-Pora',
  'Carolino',
  'Dynamo BBC',
  'Panteras BBC',
  'Peor Es Casarse',
  'Stoners',
  'Tatu',
  'Piriapolis',
  'Union',
  'Requeche',
]
const initialPositionTime = 24.4 * 1000
const initialMatchTime = 10.004 * 60000 // Initial state

let teamLocal = lbaTeams[0]
let teamVisitor = lbaTeams[1]
let scoreLocal = 0
let scoreVisitor = 0
let personalsLocal = 0
let personalsVisitor = 0
let matchTimer = false
let positionTimer = false
let positionTime = initialPositionTime
let matchTime = initialMatchTime
let quarter = 0

const getMatchStats = function getMatchStats() {
  return {
    teamLocal,
    teamVisitor,
    scoreLocal,
    personalsLocal,
    scoreVisitor,
    personalsVisitor,
    matchTimer,
    positionTimer,
    positionTime,
    matchTime,
    quarter,
  }
}

console.log('getMatchStats', getMatchStats())
let intervalPosition = null
let intervalMatch = null

const activateMatchTime = function activateMatchTime() {
  if (matchTimer && matchTime > 0) {
    clearInterval(intervalMatch)
    intervalMatch = setTimeout(function() {
      matchTime -= 100
      io.emit('setTime', matchTime)

      if (matchTime <= 0) {
        io.emit('actionBoard', false)
        clearInterval(intervalMatch)
      } else if (matchTimer) {
        activateMatchTime()
      }
    }, 100)
  } else {
    io.emit('actionBoard', false)
    clearInterval(intervalMatch)
  }
}

const activatePositionTime = function activatePositionTime() {
  if (positionTime > matchTime) {
    positionTimer = false
    positionTime = initialPositionTime
    io.emit('setTimePosition', positionTime)
    io.emit('actionPositionCloak', false)
  } else if (positionTimer && positionTime > 0) {
    clearInterval(intervalPosition)
    matchTimer = true
    io.emit('actionBoard', true)
    activateMatchTime()
    intervalPosition = setTimeout(function() {
      positionTime -= 100
      io.emit('setTimePosition', positionTime)

      if (positionTime <= 0) {
        io.emit('actionPositionCloak', false)
        clearInterval(intervalPosition)
      } else if (positionTimer) {
        activatePositionTime()
      }
    }, 100)
  } else {
    io.emit('actionPositionCloak', false)
    clearInterval(intervalPosition)
  }
}

io.on('connection', function(socket) {
  console.log('Got connection')
  socket.emit('match', getMatchStats())
  io.emit('setTime', matchTime)
  socket.on('addScoreLocal', function(points) {
    console.log('addScoreToLocal', points)
    scoreLocal = scoreLocal + points < 0 ? 0 : scoreLocal + points
    io.emit('addScoreToLocal', scoreLocal)
  })
  socket.on('addScoreVisitor', function(points) {
    console.log('addScoreToVisitor', points)
    scoreVisitor = scoreVisitor + points < 0 ? 0 : scoreVisitor + points
    io.emit('addScoreToVisitor', scoreVisitor)
  })
  socket.on('actionPosition', function() {
    positionTimer = positionTime <= 0 ? false : !positionTimer
    activatePositionTime()
  })
  socket.on('actionTime', function() {
    console.log('actionTime')
    matchTimer = matchTime <= 0 ? false : !matchTimer
    positionTimer = !matchTimer ? false : positionTimer

    if (!positionTimer) {
      io.emit('actionPositionCloak', false)
    }

    activateMatchTime()
  })
  socket.on('addPersonalLocal', function(points) {
    console.log('addPersonalLocal', points)
    personalsLocal =
      personalsLocal + points < 0 || personalsLocal + points > 5
        ? 0
        : personalsLocal + points
    io.emit('setPersonalsLocal', personalsLocal)
  })
  socket.on('addPersonalVisitor', function(points) {
    console.log('addPersonalVisitor', points)
    personalsVisitor =
      personalsVisitor + points < 0 || personalsVisitor + points > 5
        ? 0
        : personalsVisitor + points
    io.emit('setPersonalsVisitor', personalsVisitor)
  })
  socket.on('advanceQuarter', function() {
    clearInterval(intervalPosition)
    matchTimer = false
    positionTimer = false
    positionTime = initialPositionTime
    matchTime = initialMatchTime
    personalsLocal = 0
    personalsVisitor = 0
    quarter = quarter > 2 ? 0 : quarter + 1
    io.emit('advanceQuarterBoard', quarter)
    io.emit('setTimePosition', positionTime)
    io.emit('setTime', matchTime)
    io.emit('actionBoard', matchTimer)
  })
  socket.on('setPositionTime', function(time) {
    console.log('setPositionTime')
    positionTime = time
    io.emit('setTimePosition', positionTime)
    positionTimer = true
    io.emit('actionPositionCloak', positionTimer)
    activatePositionTime()
  })
  socket.on('setMatchTime', function(time) {
    clearInterval(intervalPosition)
    matchTimer = false
    positionTimer = false
    positionTime = initialPositionTime
    matchTime = time
    io.emit('setTimePosition', positionTime)
    io.emit('setTime', matchTime)
    io.emit('actionBoard', matchTimer)
  })
  socket.on('setTeams', function(teams) {
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
server.listen(5000, function() {
  console.log('listening on *:5000')
})
