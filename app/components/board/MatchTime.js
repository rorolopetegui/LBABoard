import React, { useEffect, useState } from 'react'
import { styled, Paper, Grid, Typography } from '@mui/material'

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  color: 'white',
  backgroundColor: 'black',
  textAlign: 'center',
}))

const parseMinutesAndSeconds = time => {
  const miliseconds = `${(time / 10) % 100}`.slice(-2)[0]
  const seconds = `0${Math.floor((time / 1000) % 60)}`
  const minutes = `0${Math.floor((time / 60000) % 60)}`

  return `${minutes.slice(-2)}:${seconds.slice(-2)}`
}

const MatchTime = props => {
  const { socket, initialTime } = props
  const [time, setTime] = useState(initialTime)
  const [timerOn, setTimerOn] = useState(false)

  useEffect(() => {
    let interval = null

    if (timerOn) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime - 10)
      }, 10)
    } else {
      clearInterval(interval)
    }

    return () => clearInterval(interval)
  }, [timerOn])

  useEffect(() => {
    if (time <= 0) {
      setTimerOn(false)
    }
  }, [time])

  socket.on('actionBoard', () => {
    setTimerOn(!timerOn)
  })

  socket.on('advanceQuarterBoard', () => {
    setTime(initialTime)
    setTimerOn(false)
  })

  return (
    <Grid item xs={7}>
      <Item
        variant="outlined"
        square
        style={{
          borderLeft: '0.05rem solid grey',
          borderRight: '0.05rem solid grey',
        }}
      >
        <Typography variant="h6">{parseMinutesAndSeconds(time)}</Typography>
      </Item>
    </Grid>
  )
}

export default MatchTime
