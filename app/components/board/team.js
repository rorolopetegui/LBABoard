import React from 'react'
import { styled, Paper, Grid, Typography } from '@mui/material'

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
      width: '5rem',
    }}
  />
)

const Team = props => {
  const { team } = props
  return (
    <TeamPaper
      variant="outlined"
      square
      style={{
        backgroundImage: `radial-gradient(${team.color} 50%, black 100%)`,
      }}
    >
      <Grid container>
        <Grid item xs={3} style={{ position: 'relative' }}>
          <ImgLogo img={team.logo} />
        </Grid>
        <Grid item xs={7} style={{ position: 'relative' }}>
          <Personals>
            <Grid container spacing={3} style={{ justifyContent: 'center' }}>
              <Grid item xs={1} style={{ position: 'relative' }}>
                <Personal variant="outlined" />
              </Grid>
              <Grid item xs={1} style={{ position: 'relative' }}>
                <Personal variant="outlined" />
              </Grid>
              <Grid item xs={1} style={{ position: 'relative' }}>
                <Personal variant="outlined" />
              </Grid>
              <Grid item xs={1} style={{ position: 'relative' }}>
                <Personal variant="outlined" />
              </Grid>
              <Grid item xs={1} style={{ position: 'relative' }}>
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
        <Grid item xs={2}>
          <Typography
            variant="h6"
            style={{
              marginTop: '2px',
              marginRight: '2px',
              backgroundColor: '#fafafa',
              color: team.color,
              textAlign: 'center',
            }}
          >
            23
          </Typography>
        </Grid>
      </Grid>
    </TeamPaper>
  )
}

export default Team
