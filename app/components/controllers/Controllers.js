import React, { useState } from 'react'
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
} from '@mui/material'
import { AddCircleRounded, RemoveCircleRounded } from '@mui/icons-material'
import { io } from '../common/socket.io'

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
}))

const teams = [
  'Are-Pora',
  'Carolino',
  'Dynamo BBC',
  'Panteras BBC',
  'Peor Es Casarse',
  'Stoners',
]

const socket = io('http://192.168.0.110:5000')

const Controllers = () => {
  const [teamLocal, setTeamLocal] = useState('Are-Pora')
  const [teamVisitor, setTeamVisitor] = useState('Carolino')
  const actionTimers = () => {
    socket.emit('actionTime')
  }
  const actionPosition = () => {
    socket.emit('actionPosition')
  }
  const addLocalScore = points => {
    socket.emit('addScoreLocal', points)
  }
  const addScoreVisitor = points => {
    socket.emit('addScoreVisitor', points)
  }
  const addPersonalLocal = points => {
    socket.emit('addPersonalLocal', points)
  }
  const addPersonalVisitor = points => {
    socket.emit('addPersonalVisitor', points)
  }
  const advanceQuarter = () => {
    socket.emit('advanceQuarter')
  }
  const setPositionTime = time => {
    socket.emit('setPositionTime', time)
  }
  const setTeams = () => {
    socket.emit('setTeams', [teamLocal, teamVisitor])
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
                    <Icon
                      aria-label="Rest"
                      size="large"
                      onClick={() => addLocalScore(-1)}
                    >
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
                      onClick={() => setPositionTime(14)}
                    >
                      14
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      style={{ marginRight: '1rem' }}
                      onClick={() => setPositionTime(24)}
                    >
                      24
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => actionPosition()}
                    >
                      P/C
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
                      P/C
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
                      <MenuItem key={index} value={team}>{team}</MenuItem>
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
                      <MenuItem key={index} value={team}>{team}</MenuItem>
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
