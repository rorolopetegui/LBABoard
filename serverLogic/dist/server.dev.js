"use strict";

var express = require('express');

var cors = require('cors');

var app = express();

var http = require('http');

var server = http.createServer(app);

var _require = require('socket.io'),
    Server = _require.Server;

var io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});
app.use(cors());
app.get('/teams', function (req, res) {
  // TODO HAY QUE MEJORAR ESTO, PARA QUE SE CARGUEN LAS IMAGENES TAMBIEN
  res.send(lbaTeams);
});
var lbaTeams = ['Are-Pora', 'Carolino', 'Dynamo BBC', 'Panteras BBC', 'Peor Es Casarse', 'Stoners', 'Tatu', 'Piriapolis', 'Union', 'Requeche'];
var initialPositionTime = 24.4 * 1000;
var initialMatchTime = 10.004 * 60000; // Initial state

var teamLocal = lbaTeams[0];
var teamVisitor = lbaTeams[1];
var scoreLocal = 0;
var scoreVisitor = 0;
var personalsLocal = 0;
var personalsVisitor = 0;
var matchTimer = false;
var positionTimer = false;
var positionTime = initialPositionTime;
var matchTime = initialMatchTime;
var quarter = 0;

var getMatchStats = function getMatchStats() {
  return {
    teamLocal: teamLocal,
    teamVisitor: teamVisitor,
    scoreLocal: scoreLocal,
    personalsLocal: personalsLocal,
    scoreVisitor: scoreVisitor,
    personalsVisitor: personalsVisitor,
    matchTimer: matchTimer,
    positionTimer: positionTimer,
    positionTime: positionTime,
    matchTime: matchTime,
    quarter: quarter
  };
};

console.log('getMatchStats', getMatchStats());
var intervalPosition = null;
var intervalMatch = null;

var activateMatchTime = function activateMatchTime() {
  if (matchTimer && matchTime > 0) {
    clearInterval(intervalMatch);
    intervalMatch = setTimeout(function () {
      matchTime -= 110;
      io.emit('setTime', matchTime);

      if (matchTime <= 0) {
        io.emit('actionBoard', false);
        io.emit('setTime', 0);
        clearInterval(intervalMatch);
      } else if (matchTimer) {
        activateMatchTime();
      }
    }, 100);
  } else {
    io.emit('actionBoard', false);
    clearInterval(intervalMatch);
  }
};

var activatePositionTime = function activatePositionTime() {
  if (positionTime > matchTime) {
    positionTimer = false;
    positionTime = initialPositionTime;
    io.emit('setTimePosition', positionTime);
    io.emit('actionPositionCloak', false);
  } else if (positionTimer && positionTime > 0) {
    clearInterval(intervalPosition);
    matchTimer = true;
    io.emit('actionBoard', true);
    activateMatchTime();
    intervalPosition = setTimeout(function () {
      positionTime -= 110;
      io.emit('setTimePosition', positionTime);

      if (positionTime <= 0) {
        io.emit('actionPositionCloak', false);
        io.emit('setTimePosition', 0);
        clearInterval(intervalPosition);
      } else if (positionTimer) {
        activatePositionTime();
      }
    }, 100);
  } else {
    io.emit('actionPositionCloak', false);
    clearInterval(intervalPosition);
  }
};

io.on('connection', function (socket) {
  console.log('Got connection');
  socket.emit('match', getMatchStats());
  io.emit('setTime', matchTime);
  socket.on('addScoreLocal', function (points) {
    console.log('addScoreToLocal', points);
    scoreLocal = scoreLocal + points < 0 ? 0 : scoreLocal + points;
    io.emit('addScoreToLocal', scoreLocal);
  });
  socket.on('addScoreVisitor', function (points) {
    console.log('addScoreToVisitor', points);
    scoreVisitor = scoreVisitor + points < 0 ? 0 : scoreVisitor + points;
    io.emit('addScoreToVisitor', scoreVisitor);
  });
  socket.on('actionPosition', function () {
    positionTimer = positionTime <= 0 ? false : !positionTimer;
    activatePositionTime();
  });
  socket.on('actionTime', function () {
    console.log('actionTime');
    matchTimer = matchTime <= 0 ? false : !matchTimer;
    positionTimer = !matchTimer ? false : positionTimer;

    if (!positionTimer) {
      io.emit('actionPositionCloak', false);
    }

    activateMatchTime();
  });
  socket.on('addPersonalLocal', function (points) {
    console.log('addPersonalLocal', points);
    personalsLocal = personalsLocal + points < 0 || personalsLocal + points > 5 ? 0 : personalsLocal + points;
    io.emit('setPersonalsLocal', personalsLocal);
  });
  socket.on('addPersonalVisitor', function (points) {
    console.log('addPersonalVisitor', points);
    personalsVisitor = personalsVisitor + points < 0 || personalsVisitor + points > 5 ? 0 : personalsVisitor + points;
    io.emit('setPersonalsVisitor', personalsVisitor);
  });
  socket.on('advanceQuarter', function () {
    clearInterval(intervalPosition);
    matchTimer = false;
    positionTimer = false;
    positionTime = initialPositionTime;
    matchTime = initialMatchTime;
    personalsLocal = 0;
    personalsVisitor = 0;
    quarter = quarter > 2 ? 0 : quarter + 1;
    io.emit('advanceQuarterBoard', quarter);
    io.emit('setTimePosition', positionTime);
    io.emit('setTime', matchTime);
    io.emit('actionBoard', matchTimer);
  });
  socket.on('setPositionTime', function (time) {
    console.log('setPositionTime');
    positionTime = time;
    io.emit('setTimePosition', positionTime);
    positionTimer = true;
    io.emit('actionPositionCloak', positionTimer);
    activatePositionTime();
  });
  socket.on('setMatchTime', function (time) {
    clearInterval(intervalPosition);
    matchTimer = false;
    positionTimer = false;
    positionTime = initialPositionTime;
    matchTime = time;
    io.emit('setTimePosition', positionTime);
    io.emit('setTime', matchTime);
    io.emit('actionBoard', matchTimer);
  });
  socket.on('setTeams', function (teams) {
    console.log('setTeams', teams);
    teamLocal = teams[0];
    teamVisitor = teams[1];
    scoreLocal = 0;
    scoreVisitor = 0;
    io.emit('setMatch', teams);
    matchTimer = false;
    io.emit('actionBoard', matchTimer);
  });
});
server.listen(5000, function () {
  console.log('listening on *:5000');
});