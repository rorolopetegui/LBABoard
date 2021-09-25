import React, { useEffect } from 'react'
import { Box } from '@mui/material'
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
    },
    {
      id: 1,
      logo: logo2,
      name: 'Panteras BBC',
      color: '#0d1232',
    },
  ]

const Board = () => {
  let socket
  useEffect(() => {
    socket = io('http://localhost:5000/')
    socket.emit('initialize')
  })
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
        <Team key={team.id} team={team} />
      ))}
      <Quarter />
    </Box>
  )
}

export default Board
