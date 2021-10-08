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
  const [time, setTime] = useState(0)
  const [timerOn, setTimerOn] = useState(props.turnedOn || false)
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

  useEffect(() => {
    socket.on('match', myMatch => {
      setTime(myMatch.positionTime)
    })

    socket.on('actionPositionCloak', state => {
      console.log('actionPositionCloak', state)
      setTimerOn(state)
    })

    socket.on('setTimePosition', newTime => {
      console.log('setTimePosition')
      setTime(newTime)
    })

    socket.on('advanceQuarterBoard', () => {
      console.log('advanceQuarterBoard')
      setTime(props.initialTime)
    })
  }, [])

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
