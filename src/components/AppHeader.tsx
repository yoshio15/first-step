import React from 'react';
import { withRouter, Link } from 'react-router-dom'
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Create from '@material-ui/icons/Create';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Store from '../store/index'
import Actions from '../store/action'

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

const logout = () => {
  const emptyUserInfo = {
    id: '',
    user: ''
  }
  Store.dispatch(Actions.updateUser(emptyUserInfo))
}

const AppHeader: React.FC = () => {
  const classes = useStyle()
  if (Store.getState().store.user) {
    return (
      <AppBar position='static' className={classes.headerStyle}>
        <Toolbar>
          <Typography
            variant='h5'
            className={classes.title}
          >First-Step</Typography>
          <Button
            // variant='outlined'
            onClick={() => logout()}
            component={Link}
            to='/login'
          ><ExitToAppIcon color='primary' />ログアウト</Button>
          <Button
            // variant='outlined'
            component={Link}
            to='/post-work'
          ><Create color='primary' />投稿する</Button>
        </Toolbar>
      </AppBar>
    )
  } else {
    return (
      <AppBar position='static' className={classes.headerStyle}>
        <Toolbar>
          <Typography
            variant='h5'
            className={classes.title}
          // component={Link}
          // to='/'
          >First-Step</Typography>
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
    )
  }

}

export default withRouter(AppHeader)