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
  if (time <= 0) return `0.0`
  if (time < 10 * 1000) return `${seconds.slice(-1)}.${miliseconds}`
  return `${minutes.slice(-2)}:${seconds.slice(-2)}`
}

const MatchTime = props => {
  const { socket } = props
  const [time, setTime] = useState(0)

  useEffect(() => {
    socket.on('setTime', newTime => {
      setTime(newTime)
    })
    socket.on('match', myMatch => {
      setTime(myMatch.matchTime)
    })
  }, [])

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
