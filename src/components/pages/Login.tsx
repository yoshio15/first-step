import React from 'react';
import { Container, Button, TextField, Typography, Paper, Grid, Box } from '@material-ui/core';
import withStyles, { WithStyles, StyleRules } from "@material-ui/core/styles/withStyles";
import createStyles from "@material-ui/core/styles/createStyles";
import * as H from 'history'
import { Auth } from 'aws-amplify'
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
    height: '360px'
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
  password: string
}

class Login extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      username: '',
      password: ''
    }
    this.handleChangeUsername = this.handleChangeUsername.bind(this)
    this.handleChangePassword = this.handleChangePassword.bind(this)
    this.logIn = this.logIn.bind(this)
  }

  logIn() {
    let username = this.state.username
    let password = this.state.password
    console.log(username, password)
    Auth.signIn(username, password)
      .then((res) => { 
        console.log(res)
        Store.dispatch(Actions.updateUser(res.username))
        this.props.history.push('works-list')
       })
      .catch((err) => { console.log(err) })
  }

  handleChangeUsername(e: any) { this.setState({ username: e.target.value }) }

  handleChangePassword(e: any) { this.setState({ password: e.target.value }) }

  render() {
    const { classes } = this.props
    console.log(Store)
    return (
      <Container className={classes.container}>
        <Paper className={classes.paper} variant='outlined'>
          <Grid container justify='center'>
            <Grid item xs={11}>
              <Box mt={5}></Box>
              <Typography component="h1" variant="h5">
                ログイン
              </Typography>
              <Box mt={2}></Box>
              <TextField variant='outlined' margin='normal' label='ユーザ名' value={this.state.username} onChange={this.handleChangeUsername} autoFocus required fullWidth></TextField>
              <TextField variant='outlined' margin='normal' label='パスワード' value={this.state.password} onChange={this.handleChangePassword} required fullWidth></TextField>
              <Box mt={5}></Box>
              <Button variant='contained' color='primary' onClick={this.logIn} fullWidth>Login</Button>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    )
  }
}

export default withStyles(styles)(Login)