import React from 'react';
import { Container, Button, TextField, Typography, Paper, Grid, Box, LinearProgress, Card, CardContent, CardActions } from '@material-ui/core';
import withStyles, { WithStyles, StyleRules } from "@material-ui/core/styles/withStyles";
import createStyles from "@material-ui/core/styles/createStyles";
import * as H from 'history'
import { Auth } from 'aws-amplify'
import Store from '../../store/index'
import Actions from '../../store/action'
import { MESSAGES } from '../../constants/config'

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
  errorMsg: string,
  isShownProgress: boolean,
  isLoginFailed: boolean
}

class Login extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      errorMsg: '',
      isShownProgress: false,
      isLoginFailed: false
    }
    this.handleChangeUsername = this.handleChangeUsername.bind(this)
    this.handleChangePassword = this.handleChangePassword.bind(this)
    this.logIn = this.logIn.bind(this)
  }

  logIn() {
    let username = this.state.username
    let password = this.state.password
    console.log(username, password)
    // ユーザ名/パスワードは入力必須なため、未入力があればリターン
    if (!username || !password) {
      this.setState({
        isShownProgress: false,
        isLoginFailed: true,
        errorMsg: MESSAGES.MISSING_PARAMETERS
      })
      return
    }
    this.setState({ isShownProgress: true })
    Auth.signIn(username, password)
      .then((res) => {
        console.log(res)
        const userId = res.attributes.sub
        const loginUserInfo = {
          id: userId,
          user: res.username
        }
        Store.dispatch(Actions.updateUser(loginUserInfo))
        this.setState({
          isShownProgress: false,
          isLoginFailed: true
        })
        this.props.history.push('works-list')
      })
      .catch((err) => {
        console.log(err)
        switch (err.code) {
          case 'NotAuthorizedException':
            this.setState({ errorMsg: MESSAGES.LOGIN_FAILED })
            break
          case 'UserNotConfirmedException':
            this.setState({ errorMsg: MESSAGES.NO_CONFIRMED_USER })
            break
          default:
            this.setState({ errorMsg: MESSAGES.UNKNOWN_ERROR })
            break
        }
        this.setState({
          isShownProgress: false,
          isLoginFailed: true
        })
      })
  }

  handleChangeUsername(e: any) { this.setState({ username: e.target.value }) }

  handleChangePassword(e: any) { this.setState({ password: e.target.value }) }

  render() {
    const { classes } = this.props
    console.log(Store)
    console.log(`Login Props: ${JSON.stringify(this.props)}`)
    return (
      <Container className={classes.container}>
        <Card variant='outlined'>
          {this.state.isShownProgress && <LinearProgress />}
          <CardContent>
            <Grid container justify='center'>
              <Grid item xs={11}>
                <Box mt={2}></Box>
                <Typography component="h1" variant="h5">
                  ログイン
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
                  error={this.state.isLoginFailed}
                ></TextField>
                <TextField
                  variant='outlined'
                  margin='normal'
                  type='password'
                  label='パスワード'
                  value={this.state.password}
                  onChange={this.handleChangePassword}
                  required
                  fullWidth
                  error={this.state.isLoginFailed}
                ></TextField>
                {this.state.isLoginFailed &&
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
            <Button variant='contained' color='primary' onClick={this.logIn} fullWidth>Login</Button>
          </CardActions>
        </Card>
      </Container>
    )
  }
}

export default withStyles(styles)(Login)