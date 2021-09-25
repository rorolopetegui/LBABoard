import React, { useEffect, useRef } from 'react'
import { styled, Paper, Grid, Typography } from '@mui/material'

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  color: 'white',
  backgroundColor: 'black',
  textAlign: 'center',
}))

const TimePosition = props => {
  const timer = useRef(null)
  const { socket } = props
  let seconds = props.time
  let myInterval = null

  const countDown = () => {
    timer.current.innerText = `:${
      `${seconds}`.length > 1 ? seconds : `0${seconds}`
    }`

    seconds -= 1
  }
  const startCountDown = () =>
    setInterval(() => {
      if (seconds >= 0) countDown()
    }, 1000)

  socket.on('actionBoard', () => {
    if (myInterval) {
      clearInterval(myInterval)
      myInterval = null
    } else {
      myInterval = startCountDown()
    }
  })

  socket.on('actionPositionCloak', () => {
    if (myInterval) {
      clearInterval(myInterval)
      myInterval = null
    } else {
      myInterval = startCountDown()
    }
  })

  socket.on('setTimePosition', time => {
    seconds = time
    clearInterval(myInterval)
    myInterval = startCountDown()
  })

  socket.on('advanceQuarterBoard', () => {
    clearInterval(myInterval)
    myInterval = null
    seconds = 24
    timer.current.innerText = `:${
      `${seconds}`.length > 1 ? seconds : `0${seconds}`
    }`
  })

  useEffect(() => {
    timer.current.innerText = `:${
      `${seconds}`.length > 1 ? seconds : `0${seconds}`
    }`
  })
  return (
    <Grid item xs={2}>
      <Item variant="outlined" square>
        <Typography
          variant="h6"
          style={{
            background: 'radial-gradient(#7f0000 0%, transparent 80%)',
          }}
          ref={timer}
        />
      </Item>
    </Grid>
  )
}

export default TimePosition
