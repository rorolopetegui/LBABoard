import React, { useState } from 'react'
import { styled, Paper, Grid, Typography } from '@mui/material'
import TimePosition from './TimePosition'
import MatchTime from './MatchTime'

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

const quarters = ['1st', '2nd', '3rd', '4th']

const Quarter = props => {
  const [quarter, setQuarter] = useState(0)
  const { socket } = props

  socket.on('advanceQuarterBoard', () => {
    let newQuarter = quarter + 1
    if (newQuarter >= quarters.length) newQuarter = 0

    setQuarter(newQuarter)
  })

  return (
    <Score variant="outlined" square>
      <Grid container>
        <Grid item xs={3} style={{ position: 'relative' }}>
          <Item variant="outlined" square>
            <Typography variant="h6">{quarters[quarter]}</Typography>
          </Item>
        </Grid>
        <MatchTime socket={socket} initialTime={props.matchTime} />
        <TimePosition socket={socket} initialTime={props.positionCloak} />
      </Grid>
    </Score>
  )
}

export default Quarter
