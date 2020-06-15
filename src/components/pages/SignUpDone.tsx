import React from 'react'
import * as H from 'history'
import { Container, Paper, Grid, Typography, Button, Box } from '@material-ui/core'
import Store from '../../store/index'

interface Props {
  history: H.History
}
const SignUpDone: React.FC<Props> = (props) => {
  console.log(props)
  return (
    <Container>
      <Box mt={8}></Box>
      <Paper>
        <Grid container justify='center'>
          <Grid item>
            <Grid container justify='center'>
              <Grid item>
                <Box mt={5}></Box>
                <Typography variant='h5'>
                  アカウントの登録を受け付けました。
                </Typography>
              </Grid>
            </Grid>
            <Grid container justify='center'>
              <Grid item>
                <Box mt={5}></Box>
                <Typography variant='h6'>
                  ご登録いただいた「{Store.getState().store.email}」宛に登録確認用のご案内をお送りしましたので、
                </Typography>
              </Grid>
            </Grid>
            <Grid container justify='center'>
              <Grid item>
                <Typography variant='h6'>
                  メールの内容を確認して、First-Stepアカウントの登録作業を完了してください。
                </Typography>
              </Grid>
            </Grid>
            <Grid container justify='center'>
              <Grid item>
                <Box mt={5}></Box>
                <Button
                  color='primary'
                  variant='contained'
                  onClick={() => props.history.push('/login')}
                >ログイン画面へ</Button>
                <Box mb={3}></Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  )
}

export default SignUpDone