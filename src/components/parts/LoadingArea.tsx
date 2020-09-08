import React from 'react'
import { Grid, Box, CircularProgress, LinearProgress } from '@material-ui/core'

const LoadingArea: React.FC = () => {
  return (
    <div>
      {/* <LinearProgress /> */}
      <Box mt={3}></Box>
      <Grid container justify='center'>
        <Grid xs={1} item>
          <CircularProgress />
        </Grid>
      </Grid>
    </div>
  )
}

export default LoadingArea