import React from 'react';
import { withRouter, Link } from 'react-router-dom'
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

const useStyle = makeStyles(theme => ({
  headerStyle: {
    backgroundColor: '#fff'
  },
  title: {
    flexGrow: 1,
    color: '#000'
  },
  loginBtn: {
    marginRight: theme.spacing(2)
  },
  signUpBtn: {
    backgroundColor: "#eba134",
    color: '#fff'
  }
})
)

const AppHeader: React.FC = () => {
  const classes = useStyle()
  return (
    <AppBar position='static' className={classes.headerStyle}>
      <Toolbar>
        <Typography variant='h5' className={classes.title}>
          First-Step
        </Typography>
        <LockOutlinedIcon color='primary' />
        <Button
          className={classes.loginBtn}
          component={Link}
          to='/login'
        >ログイン</Button>
        <Button
          className={classes.signUpBtn}
          component={Link}
          to='/sign-up'
        >無料会員登録</Button>
      </Toolbar>
    </AppBar>
  );
}

export default withRouter(AppHeader)