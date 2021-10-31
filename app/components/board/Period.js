import React, { useState, useEffect } from 'react'
import { styled, Paper, Grid, Typography } from '@mui/material'

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  color: 'white',
  backgroundColor: 'black',
  textAlign: 'center',
}))

const quarters = ['1st', '2nd', '3rd', '4th']

const Period = props => {
  const { socket } = props
  const [period, setPeriod] = useState(0)

  useEffect(() => {
    socket.on('advanceQuarterBoard', newPeriod => {
      console.log('advanceQuarterBoard')
      setPeriod(newPeriod)
    })
    socket.on('match', myMatch => {
      setPeriod(myMatch.quarter)
    })
  }, [socket])

  return (
    <Grid item xs={3} style={{ position: 'relative' }}>
      <Item variant="outlined" square>
        <Typography variant="h6">{quarters[period]}</Typography>
      </Item>
    </Grid>
  )
}

export default Period
