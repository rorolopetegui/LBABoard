/* eslint-disable radix */
import React, { useState, useEffect } from 'react'
import {
  CssBaseline,
  Container,
  Box,
  Paper,
  styled,
  Button,
  IconButton,
  Grid,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from '@mui/material'
import { AddCircleRounded, RemoveCircleRounded } from '@mui/icons-material'
import useStore from '../../store'

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}))

const Icon = styled(IconButton)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(3),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  transform: 'scale(1.5)',
}))

const InputText = styled(TextField)(({ theme }) => ({
  width: '6rem',
  margin: theme.spacing(1),
}))

const teams = [
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

const Controllers = () => {
  const [teamLocal, setTeamLocal] = useState('Are-Pora')
  const [teamVisitor, setTeamVisitor] = useState('Carolino')
  const [matchTimeOn, setMatchTimeOn] = useState(false)
  const [positionTimeOn, setPositionTimeOn] = useState(false)
  const [timeMatch, setTimeMatch] = useState(1000)

  const store = useStore(state => state)
  const { socket } = store

  useEffect(() => {
    socket.on('advanceQuarterBoard', () => {
      setMatchTimeOn(false)
      setPositionTimeOn(false)
    })

    socket.on('actionPositionCloak', state => {
      console.log('actionPositionCloak', state)
      setPositionTimeOn(state)
    })

    socket.on('actionBoard', state => {
      setMatchTimeOn(state)
    })
  }, [socket])

  const actionTimers = () => {
    setMatchTimeOn(!matchTimeOn)
    socket.emit('actionTime')
  }
  const actionPosition = () => {
    setPositionTimeOn(!positionTimeOn)
    socket.emit('actionPosition')
  }
  const addLocalScore = points => {
    socket.emit('addScoreLocal', points)
  }
  const addScoreVisitor = points => {
    socket.emit('addScoreVisitor', points)
  }
  const addPersonalLocal = points => {
    console.log('addPersonalLocal', points)
    socket.emit('addPersonalLocal', points)
  }
  const addPersonalVisitor = points => {
    console.log('addPersonalVisitor', points)
    socket.emit('addPersonalVisitor', points)
  }
  const advanceQuarter = () => {
    setPositionTimeOn(false)
    socket.emit('advanceQuarter')
  }
  const setPositionTime = time => {
    setPositionTimeOn(true)
    socket.emit('setPositionTime', time)
  }
  const setTeams = () => {
    socket.emit('setTeams', [teamLocal, teamVisitor])
  }

  const setMatchTime = () => {
    let completedTime = `${timeMatch}`
    if (completedTime.length < 4) {
      const cerosToComplete = 4 - completedTime.length
      for (let i = 0; i < cerosToComplete; i++) {
        completedTime = `0${completedTime}`
      }
    }

    const minutes = parseInt(completedTime.slice(0, 2)) * 60000
    const seconds = (parseInt(completedTime.slice(-2)) + 0.5) * 1000

    completedTime = minutes + seconds
    socket.emit('setMatchTime', completedTime)
  }

  return (
    <>
      <CssBaseline />
      <Container maxWidth="sm">
        <Box sx={{ bgcolor: '#cfe8fc', height: '100vh' }}>
          <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
            <Box gridColumn="span 6">
              <Item>
                <Typography variant="h6">LOCAL</Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant="h8">Puntos</Typography>
                    <br />
                    <Icon aria-label="Rest" onClick={() => addLocalScore(-1)}>
                      <RemoveCircleRounded />
                    </Icon>
                    <Icon
                      aria-label="Rest"
                      size="large"
                      onClick={() => addLocalScore(1)}
                    >
                      <AddCircleRounded />
                    </Icon>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="h8">Colectivas</Typography>
                    <br />
                    <Icon
                      aria-label="Rest"
                      size="large"
                      onClick={() => addPersonalLocal(-1)}
                    >
                      <RemoveCircleRounded />
                    </Icon>
                    <Icon
                      aria-label="Rest"
                      size="large"
                      onClick={() => addPersonalLocal(1)}
                    >
                      <AddCircleRounded />
                    </Icon>
                  </Grid>
                </Grid>
              </Item>
            </Box>
            <Box gridColumn="span 6">
              <Item>
                <Typography variant="h6">VISITA</Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant="h8">Puntos</Typography>
                    <br />
                    <Icon
                      aria-label="Rest"
                      size="large"
                      onClick={() => addScoreVisitor(-1)}
                    >
                      <RemoveCircleRounded />
                    </Icon>
                    <Icon
                      aria-label="Rest"
                      size="large"
                      onClick={() => addScoreVisitor(1)}
                    >
                      <AddCircleRounded />
                    </Icon>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="h8">Colectivas</Typography>
                    <br />
                    <Icon
                      aria-label="Rest"
                      size="large"
                      onClick={() => addPersonalVisitor(-1)}
                    >
                      <RemoveCircleRounded />
                    </Icon>
                    <Icon
                      aria-label="Rest"
                      size="large"
                      onClick={() => addPersonalVisitor(1)}
                    >
                      <AddCircleRounded />
                    </Icon>
                  </Grid>
                </Grid>
              </Item>
            </Box>
            <Box gridColumn="span 12">
              <Item>
                <Typography variant="h6">Tiempo</Typography>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography variant="h8">24</Typography>
                    <br />
                    <Button
                      variant="outlined"
                      size="small"
                      style={{ marginRight: '1rem' }}
                      onClick={() => setPositionTime(14.6 * 1000)}
                    >
                      14
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      style={{ marginRight: '1rem' }}
                      onClick={() => setPositionTime(24.6 * 1000)}
                    >
                      24
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => actionPosition()}
                    >
                      {positionTimeOn ? 'PAUSAR' : 'INICIAR'}
                    </Button>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="h8">Partido</Typography>
                    <br />
                    <Button
                      variant="outlined"
                      size="small"
                      style={{ marginRight: '1rem' }}
                      onClick={() => advanceQuarter()}
                    >
                      Cuarto
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => actionTimers()}
                    >
                      {matchTimeOn ? 'PAUSAR' : 'INICIAR'}
                    </Button>
                    <br />
                    <InputText
                      label="Tiempo"
                      variant="filled"
                      size="small"
                      value={timeMatch}
                      inputProps={{ maxLength: 4 }}
                      onChange={e => setTimeMatch(e.target.value)}
                    />
                    <br />
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => setMatchTime()}
                    >
                      Aplicar
                    </Button>
                  </Grid>
                </Grid>
              </Item>
            </Box>
            <Box gridColumn="span 12">
              <Item>
                <FormControl fullWidth>
                  <InputLabel>Local</InputLabel>
                  <Select
                    value={teamLocal}
                    label="Local"
                    onChange={e => setTeamLocal(e.target.value)}
                  >
                    {teams.map((team, index) => (
                      <MenuItem key={index} value={team}>
                        {team}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <br />
                <br />
                <FormControl fullWidth>
                  <InputLabel>Visita</InputLabel>
                  <Select
                    value={teamVisitor}
                    label="Visita"
                    onChange={e => setTeamVisitor(e.target.value)}
                  >
                    {teams.map((team, index) => (
                      <MenuItem key={index} value={team}>
                        {team}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => setTeams()}
                >
                  Setear equipos
                </Button>
              </Item>
            </Box>
          </Box>
        </Box>
      </Container>
    </>
  )
}

export default Controllers
