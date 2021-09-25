import React, { useState } from 'react'
import { Box, Button } from '@mui/material'
import Team from './Team'
import Quarter from './Quarter'
import logo1 from '../../images/dynamo.png'
import logo2 from '../../images/panterasbbc.png'
import { io } from '../common/socket.io'

const loadTeams = () =>
  // Here should load teams who will play
  [
    {
      id: 0,
      logo: logo1,
      name: 'Dynamo BBC',
      color: '#221e1f',
      isLocal: true,
    },
    {
      id: 1,
      logo: logo2,
      name: 'Panteras BBC',
      color: '#0d1232',
      isLocal: false,
    },
  ]

const matchInitialState = {
  scoreLocal: 0,
  scoreVisitor: 0,
  positionCloak: 24,
  match: 10,
  quarter: '1st',
}

const Board = () => {
  const [boardState, setBoardState] = useState(matchInitialState)

  const socket = io('http://localhost:5000/')

  const startTimers = () => {
    socket.emit('continueTime')
  }
  const stopTimers = () => {
    socket.emit('pauseTime')
  }

  return (
    <Box
      sx={{
        flexGrow: 1,
        width: '20rem',
        padding: '0.025rem 0.1rem 0.025rem 0.1rem',
        backgroundImage: 'radial-gradient(#bdbdbd 50%, black 100%)',
      }}
    >
      {loadTeams().map(team => (
        <Team
          key={team.id}
          team={team}
          isLocal={team.isLocal}
          socket={socket}
        />
      ))}
      <Quarter
        matchTime={boardState.match}
        positionCloak={boardState.positionCloak}
        quarter={boardState.quarter}
        socket={socket}
      />
      <Button onClick={() => startTimers()} variant="text">
        Start
      </Button>
      <Button onClick={() => stopTimers()} variant="text">
        Stop
      </Button>
    </Box>
  )
}

export default Board
