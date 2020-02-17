import React from 'react'
import * as H from 'history'
import { Container, Paper, Grid, Typography, Button, Box } from '@material-ui/core'

interface Props {
  history: H.History
}
const SignUpDone: React.FC<Props> = (props) => {
  console.log(props)
  return (
    <Container>
      <Paper>
        <Grid container justify='center'>
          <Grid item>
            <Typography variant='h5'>
              会員登録が完了しました
            </Typography>
            <Box mt={5}></Box>
            <Button
              color='primary'
              variant='contained'
              onClick={() => props.history.push('/login')}
            >ログイン画面へ >></Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  )
}

export default SignUpDone