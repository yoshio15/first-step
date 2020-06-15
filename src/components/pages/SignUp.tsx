import React from 'react';
import * as H from 'history'
import { API } from 'aws-amplify'
import { Container, Button, TextField, Typography, Paper, Grid, Box, LinearProgress } from '@material-ui/core';
import withStyles, { WithStyles, StyleRules } from "@material-ui/core/styles/withStyles";
import createStyles from "@material-ui/core/styles/createStyles";
import { Auth } from 'aws-amplify'
import { PATHS, API_GATEWAY } from '../../constants/config'
import Store from '../../store/index'
import Actions from '../../store/action'

const styles = (): StyleRules => createStyles({
  container: {
    marginTop: '50px',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex'
  },
  paper: {
    width: '70%',
    height: '520px'
  },
  grid: {
    height: '600px'
  }
})

interface Props extends WithStyles<typeof styles> {
  history: H.History
}
interface State {
  username: string,
  password: string,
  passwordConfirmation: string,
  isShownProgress: boolean,
  email: string
}

class Login extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      passwordConfirmation: '',
      isShownProgress: false,
      email: ''
    }
    this.handleChangeUsername = this.handleChangeUsername.bind(this)
    this.handleChangePassword = this.handleChangePassword.bind(this)
    this.handleChangeEmail = this.handleChangeEmail.bind(this)
    this.handleChangePasswordConfirmation = this.handleChangePasswordConfirmation.bind(this)
    this.signUp = this.signUp.bind(this)
    this.isSamePassword = this.isSamePassword.bind(this)
  }

  signUp() {
    const username = this.state.username
    const password = this.state.password
    const email = this.state.email
    this.setState({ isShownProgress: true })
    console.log(username, password)
    if (password !== this.state.passwordConfirmation) {
      this.setState({ isShownProgress: false })
      alert('パスワードが一致しませんでした。')
      return
    }
    Auth.signUp({
      username,
      password,
      attributes: { email }
    })
      .then((res) => {
        console.log(res)
        console.log(res.userSub) // userSubをユーザIDとして設定する
        const request = {
          body: {
            username,
            userId: res.userSub
          }
        }
        Store.dispatch(Actions.setEmail(email)) // EmailをStoreにセットする
        API.post(API_GATEWAY.NAME, PATHS.POST.NEW_USER_PATH, request)
          .then(response => {
            console.log(response)
            this.props.history.push('/sign-up-done')
          }).catch(error => {
            console.log(error)
          }).finally(() => {
            this.setState({ isShownProgress: false })
          })
      })
      .catch((err) => {
        this.setState({ isShownProgress: false })
        console.log(err)
      })
  }

  handleChangeUsername(e: any) { this.setState({ username: e.target.value }) }

  handleChangePassword(e: any) { this.setState({ password: e.target.value }) }

  handleChangeEmail(e: any) { this.setState({ email: e.target.value }) }

  handleChangePasswordConfirmation(e: any) { this.setState({ passwordConfirmation: e.target.value }) }

  isSamePassword() { return this.state.password === this.state.passwordConfirmation }

  render() {
    const { classes } = this.props
    return (
      <Container className={classes.container}>
        <Paper className={classes.paper} variant='outlined'>
          {this.state.isShownProgress && <LinearProgress />}
          <Grid container justify='center'>
            <Grid item xs={11}>
              <Box mt={5}></Box>
              <Typography component="h1" variant="h5">
                無料会員登録
              </Typography>
              <Box mt={2}></Box>
              <TextField
                variant='outlined'
                margin='normal'
                label='ユーザ名'
                value={this.state.username}
                onChange={this.handleChangeUsername}
                autoFocus
                required
                fullWidth
              ></TextField>
              <TextField
                variant='outlined'
                margin='normal'
                label='メースアドレス'
                type='normal'
                value={this.state.email}
                onChange={this.handleChangeEmail}
                required
                fullWidth
              ></TextField>
              <TextField
                variant='outlined'
                margin='normal'
                label='パスワード'
                type='password'
                value={this.state.password}
                onChange={this.handleChangePassword}
                required
                fullWidth
              ></TextField>
              <TextField
                variant='outlined'
                margin='normal'
                label='パスワード確認用'
                type='password'
                value={this.state.passwordConfirmation}
                onChange={this.handleChangePasswordConfirmation}
                required
                fullWidth
              ></TextField>
              <Box mt={5}></Box>
              <Button variant='contained' color='primary' onClick={this.signUp} fullWidth>無料会員登録</Button>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    )
  }
}

export default withStyles(styles)(Login)