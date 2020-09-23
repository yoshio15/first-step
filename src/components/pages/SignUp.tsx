import React from 'react';
import * as H from 'history'
import { API } from 'aws-amplify'
import { Container, Button, TextField, Typography, Paper, Grid, Box, LinearProgress, Card, CardContent, CardActions } from '@material-ui/core';
import withStyles, { WithStyles, StyleRules } from "@material-ui/core/styles/withStyles";
import createStyles from "@material-ui/core/styles/createStyles";
import { Auth } from 'aws-amplify'
import { PATHS, API_GATEWAY, MESSAGES } from '../../constants/config'
import Store from '../../store/index'
import Actions from '../../store/action'

const styles = (): StyleRules => createStyles({
  container: {
    marginTop: '50px',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex'
  },
})

interface Props extends WithStyles<typeof styles> {
  history: H.History
}
interface State {
  username: string,
  password: string,
  passwordConfirmation: string,
  isShownProgress: boolean,
  isSignUpFailed: boolean,
  errorMsg: string,
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
      isSignUpFailed: false,
      errorMsg: '',
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
    if (!username || !password || !email) {
      this.setState({
        isShownProgress: false,
        isSignUpFailed: true,
        errorMsg: MESSAGES.MISSING_PARAMETERS_SIGNUP
      })
      return
    }
    if (password !== this.state.passwordConfirmation) {
      this.setState({
        isShownProgress: false,
        isSignUpFailed: true,
        errorMsg: MESSAGES.PASSWORD_MISMATCH
      })
      return
    }
    Auth.signUp({
      username,
      password,
      attributes: { email }
    })
      .then((res) => {
        console.log(res)
        const request = {
          body: {
            username,
            userId: res.userSub
          }
        }
        Store.dispatch(Actions.setEmail(email))
        API.post(API_GATEWAY.NAME, PATHS.POST.NEW_USER_PATH, request)
          .then(response => {
            console.log(response)
            this.setState({
              isSignUpFailed: false
            })
            this.props.history.push('/sign-up-done')
          }).catch(error => {
            console.log(error)
            this.setState({
              isSignUpFailed: true,
              errorMsg: MESSAGES.SIGNUP_FAILED
            })
          }).finally(() => {
            this.setState({ isShownProgress: false })
          })
      })
      .catch((err) => {
        console.log(err)
        this.setState({
          isShownProgress: false,
          isSignUpFailed: true,
          errorMsg: MESSAGES.SIGNUP_FAILED
        })
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
        <Card variant='outlined'>
          {this.state.isShownProgress && <LinearProgress />}
          <CardContent>
            <Grid container justify='center'>
              <Grid item xs={11}>
                <Box mt={2}></Box>
                <Typography component="h1" variant="h5">
                  アカウント新規作成
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
                  error={this.state.isSignUpFailed}
                  helperText='※ 登録後ユーザ名は変更出来ません。'
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
                  error={this.state.isSignUpFailed}
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
                  error={this.state.isSignUpFailed}
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
                  error={this.state.isSignUpFailed}
                ></TextField>
                {this.state.isSignUpFailed &&
                  <div>
                    <Box mt={2}></Box>
                    <Typography color='error'>
                      {this.state.errorMsg}
                    </Typography>
                  </div>
                }
              </Grid>
            </Grid>
          </CardContent>
          <CardActions>
            <Button variant='contained' color='primary' onClick={this.signUp} fullWidth>アカウントを作成する</Button>
          </CardActions>
        </Card>
      </Container>
    )
  }
}

export default withStyles(styles)(Login)
