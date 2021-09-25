import * as React from 'react'
import { styled, Paper, Grid, Typography } from '@mui/material'
import Team from './Team'

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

const Quarter = props => {
  return (
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
  )
}

export default Quarter
