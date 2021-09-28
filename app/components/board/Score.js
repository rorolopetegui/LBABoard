import React, { useState } from 'react'
import { Grid, Typography } from '@mui/material'

const Score = props => {
  const [score, setScore] = useState(0)
  const { isLocal, team, socket } = props
  const getScore = () => (`${score}`.length > 1 ? score : `0${score}`)

  if (isLocal) {
    socket.on('addScoreToLocal', points => {
      setScore(points)
    })
  } else {
    socket.on('addScoreToVisitor', points => {
      setScore(points)
    })
  }

  return (
    <Grid item xs={2}>
      <Typography
        variant="h6"
        style={{
          marginTop: '2px',
          marginRight: '2px',
          backgroundColor: '#fafafa',
          color: isLocal ? team.colorLocal : team.colorVisitor,
          textAlign: 'center',
        }}
      >
        {getScore()}
      </Typography>
    </Grid>
  )
}

export default Score