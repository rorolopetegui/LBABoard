import React, { useState, useEffect } from 'react'
import { Grid, Paper, Typography, Slide, styled } from '@mui/material'

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  backgroundColor: '#fafafa',
  textAlign: 'center',
  marginTop: '2px',
  minHeight: '2.5em',
}))
let timeoutAnimation = null
let timeoutWaitAnimation = null
const Score = props => {
  const { isLocal, team, socket } = props
  const [score, setScore] = useState(team.score)
  const [animation, setAnimation] = useState(true)
  const getScore = () => (`${score}`.length > 1 ? score : `0${score}`)

  useEffect(() => {
    if (isLocal) {
      socket.on('addScoreToLocal', points => {
        setAnimation(true)
        clearTimeout(timeoutAnimation)
        clearTimeout(timeoutWaitAnimation)
        timeoutAnimation = setTimeout(() => {
          setAnimation(false)
          timeoutWaitAnimation = setTimeout(() => {
            setAnimation(true)
            setScore(points)
          }, 250)
        }, 1000)
      })
    } else {
      socket.on('addScoreToVisitor', points => {
        setAnimation(true)
        clearTimeout(timeoutAnimation)
        clearTimeout(timeoutWaitAnimation)
        timeoutAnimation = setTimeout(() => {
          setAnimation(false)
          timeoutWaitAnimation = setTimeout(() => {
            setAnimation(true)
            setScore(points)
          }, 250)
        }, 1000)
      })
    }
  }, [isLocal, socket])

  return (
    <Grid item xs={2}>
      <Item
        variant="outlined"
        square
        style={{
          borderLeft: '0.05rem solid grey',
          borderRight: '0.05rem solid grey',
        }}
      >
        <Slide direction="up" in={animation} mountOnEnter unmountOnExit>
          <Typography
            variant="h6"
            style={{
              marginRight: '2px',
              color: isLocal ? team.colorLocal : team.colorVisitor,
              textAlign: 'center',
            }}
          >
            {getScore()}
          </Typography>
        </Slide>
      </Item>
    </Grid>
  )
}

export default Score
