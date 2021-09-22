import * as React from 'react'
import { styled, Box, Paper, Grid, Typography } from '@mui/material'
import logo1 from '../../images/dynamo.png'
import logo2 from '../../images/panterasbbc.png'

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  color: 'white',
  backgroundColor: 'black',
  textAlign: 'center',
}))

const Team = styled(Paper)(() => ({
  maxHeight: '3rem',
  overflow: 'hidden',
  border: 'none',
  borderBottom: '0.025rem solid grey',
}))

const Score = styled(Paper)(() => ({
  maxHeight: '3rem',
  overflow: 'hidden',
  border: 'none',
}))

const Personals = styled(Paper)(() => ({
  border: 'none',
  boxShadow: 'none',
  alignContent: 'center',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: 'transparent',
}))

const Personal = styled(Paper)(({ theme }) => ({
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

const loadTeams = () =>
  // Here should load teams who will play
  [
    {
      id: 0,
      logo: logo1,
      name: 'Dynamo BBC',
      color: '#221e1f',
    },
    {
      id: 1,
      logo: logo2,
      name: 'Panteras BBC',
      color: '#0d1232',
    },
  ]

const Board = () => (
  <Box
    sx={{
      flexGrow: 1,
      width: '20rem',
      padding: '0.025rem 0.1rem 0.025rem 0.1rem',
      backgroundImage: 'radial-gradient(#bdbdbd 50%, black 100%)',
    }}
  >
    {loadTeams().map(team => (
      <Team
        key={team.id}
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
      </Team>
    ))}
    <Score variant="outlined" square>
      <Grid container>
        <Grid item xs={3} style={{ position: 'relative' }}>
          <Item variant="outlined" square>
            <Typography variant="h6">4th</Typography>
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
            <Typography variant="h6">03:00</Typography>
          </Item>
        </Grid>
        <Grid item xs={2}>
          <Item variant="outlined" square>
            <Typography
              variant="h6"
              style={{
                background: 'radial-gradient(#7f0000 0%, transparent 80%)',
              }}
            >
              :24
            </Typography>
          </Item>
        </Grid>
      </Grid>
    </Score>
  </Box>
)

export default Board
