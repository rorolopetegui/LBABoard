import React, { useEffect, useRef } from 'react'
import { styled, Paper, Grid, Typography } from '@mui/material'
import Score from './Score'

const TeamPaper = styled(Paper)(() => ({
  maxHeight: '3rem',
  overflow: 'hidden',
  border: 'none',
  borderBottom: '0.025rem solid grey',
}))

const Personals = styled(Paper)(() => ({
  border: 'none',
  boxShadow: 'none',
  alignContent: 'center',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: 'transparent',
}))

const Personal = styled(Paper)(() => ({
  padding: '1px',
  width: '1rem',
  backgroundColor: 'yellow',
}))

const ImgLogo = ({ img }) => (
  <img
    src={img}
    alt="logo"
    style={{
      margin: 0,
      position: 'absolute',
      left: '50%',
      top: '50%',
      transform: 'translate(-50%, -50%)',
      width: '3.5rem',
    }}
  />
)

const Team = props => {
  const personalOne = useRef(null)
  const personalTwo = useRef(null)
  const personalThree = useRef(null)
  const personalFour = useRef(null)
  const personalFive = useRef(null)
  const { team, isLocal, socket } = props
  let currentPersonals = team.personals

  useEffect(() => {
    if (isLocal) {
      socket.on('setPersonalsLocal', points => {
        console.log('setPersonalsLocal', points)
        currentPersonals = points
        setCurrentPersonals()
      })
    } else {
      socket.on('setPersonalsVisitor', points => {
        console.log('setPersonalsLocal', points)
        currentPersonals = points
        setCurrentPersonals()
      })
    }
    socket.on('advanceQuarterBoard', () => {
      currentPersonals = 0
      setCurrentPersonals()
    })
    setCurrentPersonals()
  }, [])

  const setCurrentPersonals = () => {
    personalOne.current.style.display = currentPersonals >= 1 ? 'block' : 'none'
    personalTwo.current.style.display = currentPersonals >= 2 ? 'block' : 'none'
    personalThree.current.style.display =
      currentPersonals >= 3 ? 'block' : 'none'
    personalFour.current.style.display =
      currentPersonals >= 4 ? 'block' : 'none'
    personalFive.current.style.display =
      currentPersonals >= 5 ? 'block' : 'none'
  }

  return (
    <TeamPaper
      variant="outlined"
      square
      style={{
        backgroundImage: `radial-gradient(${
          isLocal ? team.colorLocal : team.colorVisitor
        } 50%, black 100%)`,
      }}
    >
      <Grid container>
        <Grid item xs={3} style={{ position: 'relative' }}>
          <ImgLogo img={team.logo} />
        </Grid>
        <Grid item xs={7} style={{ position: 'relative' }}>
          <Personals>
            <Grid container spacing={3} style={{ justifyContent: 'center' }}>
              <Grid
                item
                xs={1}
                style={{ position: 'relative' }}
                ref={personalOne}
              >
                <Personal variant="outlined" />
              </Grid>
              <Grid
                item
                xs={1}
                style={{ position: 'relative' }}
                ref={personalTwo}
              >
                <Personal variant="outlined" />
              </Grid>
              <Grid
                item
                xs={1}
                style={{ position: 'relative' }}
                ref={personalThree}
              >
                <Personal variant="outlined" />
              </Grid>
              <Grid
                item
                xs={1}
                style={{ position: 'relative' }}
                ref={personalFour}
              >
                <Personal variant="outlined" />
              </Grid>
              <Grid
                item
                xs={1}
                style={{ position: 'relative' }}
                ref={personalFive}
              >
                <Personal variant="outlined" />
              </Grid>
            </Grid>
          </Personals>
          <Typography
            variant="h6"
            style={{ color: '#fafafa', textAlign: 'center' }}
          >
            {team.name}
          </Typography>
        </Grid>
        <Score team={team} isLocal={isLocal} socket={socket} />
      </Grid>
    </TeamPaper>
  )
}

export default Team
