import React, { useState, useEffect } from 'react'
import { Box } from '@mui/material'
import Team from './Team'
import Quarter from './Quarter'
import logoArepora from '../../images/arepora.png'
import logoCarolino from '../../images/carolino.png'
import logoDynamo from '../../images/dynamo.png'
import logoPanteras from '../../images/panterasbbc.png'
import logoPeorEsCasarse from '../../images/peorescasarse.png'
import logoStoners from '../../images/stoners.png'
import useStore from '../../store'

const lbaTeams =
  // Here should load teams who will play
  [
    {
      id: 0,
      logo: logoArepora,
      name: 'Are-Pora',
      colorVisitor: 'rgb(210 114 27)',
      colorLocal: 'rgb(0 0 0)',
      isLocal: true,
    },
    {
      id: 1,
      logo: logoCarolino,
      name: 'Carolino',
      colorVisitor: 'rgb(211 33 20)',
      colorLocal: 'rgb(0 0 0)',
      isLocal: false,
    },
    {
      id: 2,
      logo: logoDynamo,
      name: 'Dynamo BBC',
      colorVisitor: '#221e1f',
      colorLocal: 'rgb(0 0 0)',
      isLocal: false,
    },
    {
      id: 3,
      logo: logoPanteras,
      name: 'Panteras BBC',
      colorVisitor: 'rgb(74 222 226)',
      colorLocal: 'rgb(0 0 0)',
      isLocal: false,
    },
    {
      id: 4,
      logo: logoPeorEsCasarse,
      name: 'Peor Es Casarse',
      colorVisitor: '#172d79',
      colorLocal: 'rgb(0 0 0)',
      isLocal: false,
    },
    {
      id: 5,
      logo: logoStoners,
      name: 'Stoners',
      colorVisitor: 'rgb(0 0 0)',
      colorLocal: 'rgb(0 0 0)',
      isLocal: false,
    },
  ]

let matchInitialState = {
  scoreLocal: 0,
  scoreVisitor: 0,
  positionCloak: 24.9 * 1000,
  match: 10.009 * 60000,
  quarter: 0,
}

const Board = () => {
  const [teams, setTeams] = useState([])
  const [initialState, setInitialState] = useState(matchInitialState)
  const store = useStore(state => state)
  useEffect(() => {
    store.socket.on('setMatch', selectedTeams => {
      const myMatch = []
      lbaTeams.forEach(team => {
        if (selectedTeams.includes(team.name)) {
          if (selectedTeams.indexOf(team.name) === 0) {
            myMatch[0] = {
              id: team.id,
              logo: team.logo,
              name: team.name,
              colorVisitor: team.colorVisitor,
              colorLocal: team.colorLocal,
              isLocal: true,
              score: 0,
              personals: 0,
            }
          } else {
            myMatch[1] = {
              id: team.id,
              logo: team.logo,
              name: team.name,
              colorVisitor: team.colorVisitor,
              colorLocal: team.colorLocal,
              isLocal: false,
              score: 0,
              personals: 0,
            }
          }
        }
      })
      console.log('myMatch', myMatch)
      setTeams(myMatch)
    })

    store.socket.on('match', myMatch => {
      console.log('match', myMatch)
      const matchedTeams = []
      const selectedTeams = []
      selectedTeams.push(myMatch.teamLocal)
      selectedTeams.push(myMatch.teamVisitor)
      lbaTeams.forEach(team => {
        if (selectedTeams.includes(team.name)) {
          if (selectedTeams.indexOf(team.name) === 0) {
            matchedTeams[0] = {
              id: team.id,
              logo: team.logo,
              name: team.name,
              colorVisitor: team.colorVisitor,
              colorLocal: team.colorLocal,
              isLocal: true,
              score: myMatch.scoreLocal,
              personals: myMatch.personalsLocal,
            }
          } else {
            matchedTeams[1] = {
              id: team.id,
              logo: team.logo,
              name: team.name,
              colorVisitor: team.colorVisitor,
              colorLocal: team.colorLocal,
              isLocal: false,
              score: myMatch.scoreVisitor,
              personals: myMatch.personalsVisitor,
            }
          }
        }
      })
      setTeams(matchedTeams)
    })
  }, [])

  return (
    <Box
      sx={{
        flexGrow: 1,
        width: '20rem',
        padding: '0.025rem 0.1rem 0.025rem 0.1rem',
        backgroundImage: 'radial-gradient(#bdbdbd 50%, black 100%)',
      }}
    >
      {teams.length > 0 &&
        teams.map(team => (
          <Team
            key={team.id}
            team={team}
            isLocal={team.isLocal}
            socket={store.socket}
          />
        ))}
      <Quarter
        matchTime={initialState.match}
        positionCloak={initialState.positionCloak}
        quarter={initialState.quarter}
        socket={store.socket}
      />
    </Box>
  )
}

export default Board
