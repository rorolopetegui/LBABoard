import * as React from 'react'
import { styled, Box, Paper, Grid } from '@mui/material'

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  boxShadow: 'none',
}))

const Board = props => {
  console.log('Board', props)
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={1}>
        <Grid item xs={2}>
          <Item>Logo Team 1</Item>
        </Grid>
        <Grid item xs={4}>
          <Item>Nombre Team 1</Item>
        </Grid>
        <Grid item xs={2}>
          <Item>Score Team 1</Item>
        </Grid>
      </Grid>
      <Grid container spacing={1}>
        <Grid item xs={2}>
          <Item>Logo Team 2</Item>
        </Grid>
        <Grid item xs={4}>
          <Item>Nombre Team 2</Item>
        </Grid>
        <Grid item xs={2}>
          <Item>Score Team 2</Item>
        </Grid>
      </Grid>
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <Item>Cuarto y Tiempo</Item>
        </Grid>
        <Grid item xs={2}>
          <Item>Reloj 24</Item>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Board
