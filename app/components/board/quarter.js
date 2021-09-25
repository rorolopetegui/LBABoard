import React, { useEffect, useRef } from 'react'
import { styled, Paper, Grid, Typography } from '@mui/material'
import TimePosition from './TimePosition'

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  color: 'white',
  backgroundColor: 'black',
  textAlign: 'center',
}))

const Score = styled(Paper)(() => ({
  maxHeight: '3rem',
  overflow: 'hidden',
  border: 'none',
}))

const Quarter = props => {
  const timer = useRef(null)
  const { socket } = props
  let time = props.matchTime * 60
  let minutes = Math.floor(time / 60)
  let seconds = time % 60
  let myInterval = null
  const countDown = () => {
    minutes = Math.floor(time / 60)
    seconds = time % 60

    timer.current.innerText = `${
      `${minutes}`.length > 1 ? minutes : `0${minutes}`
    }:${`${seconds}`.length > 1 ? seconds : `0${seconds}`}`

    time -= 1
  }
  const startCountDown = () =>
    setInterval(() => {
      if (time >= 0) countDown()
    }, 1000)
  socket.on('pauseBoard', () => {
    clearInterval(myInterval)
  })
  socket.on('continueBoard', () => {
    myInterval = startCountDown()
  })

  useEffect(() => {
    timer.current.innerText = `${
      `${minutes}`.length > 1 ? minutes : `0${minutes}`
    }:${`${seconds}`.length > 1 ? seconds : `0${seconds}`}`
  })
  return (
    <Score variant="outlined" square>
      <Grid container>
        <Grid item xs={3} style={{ position: 'relative' }}>
          <Item variant="outlined" square>
            <Typography variant="h6">{props.quarter}</Typography>
          </Item>
        </Grid>
        <Grid item xs={7}>
          <Item
            variant="outlined"
            square
            style={{
              borderLeft: '0.05rem solid grey',
              borderRight: '0.05rem solid grey',
            }}
          >
            <Typography variant="h6" ref={timer} />
          </Item>
        </Grid>
        <TimePosition socket={socket} time={props.positionCloak} />
      </Grid>
    </Score>
  )
}

export default Quarter
