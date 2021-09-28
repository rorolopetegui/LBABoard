import React, { useEffect, useState } from 'react'
import { styled, Paper, Grid, Typography } from '@mui/material'

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  color: 'white',
  backgroundColor: 'black',
  textAlign: 'center',
}))

const parseSeconds = time => {
  const miliseconds = `${(time / 10) % 100}`.slice(-2)[0]
  const seconds = `0${Math.floor((time / 1000) % 60)}`
  if (time < 5 * 1000) return `${seconds.slice(-1)}.${miliseconds}`
  return `:${seconds.slice(-2)}`
}

const TimePosition = props => {
  const [time, setTime] = useState(props.initialTime)
  const [timerOn, setTimerOn] = useState(false)
  const { socket } = props

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

  socket.on('actionPositionCloak', () => {
    setTimerOn(!timerOn)
  })

  socket.on('setTimePosition', newTime => {
    setTimerOn(true)
    setTime(newTime)
  })

  socket.on('advanceQuarterBoard', () => {
    setTime(props.initialTime)
    setTimerOn(false)
  })

  return (
    <Grid item xs={2}>
      <Item variant="outlined" square>
        <Typography
          variant="h6"
          style={{
            background: 'radial-gradient(#7f0000 0%, transparent 80%)',
          }}
        >
          {parseSeconds(time)}
        </Typography>
      </Item>
    </Grid>
  )
}

export default TimePosition
