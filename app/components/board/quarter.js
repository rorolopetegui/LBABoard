import React, { useState, useEffect } from 'react'
import { styled, Paper, Grid, Typography } from '@mui/material'
import TimePosition from './TimePosition'
import MatchTime from './MatchTime'
import Period from './Period'

const Score = styled(Paper)(() => ({
  maxHeight: '3rem',
  overflow: 'hidden',
  border: 'none',
}))

const Quarter = props => {
  const { socket } = props

  return (
    <Score variant="outlined" square>
      <Grid container>
        <Period socket={socket} />
        <MatchTime socket={socket} />
        <TimePosition socket={socket} />
      </Grid>
    </Score>
  )
}

export default Quarter
