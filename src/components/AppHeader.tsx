import React from 'react';
import { withRouter, Link, useHistory } from 'react-router-dom'
import { AppBar, Toolbar, Button, Avatar, Menu, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Create, AccountBox, ExitToApp } from '@material-ui/icons';
import Store from '../store/index'
import Actions from '../store/action'
import HeaderImg from '../static/header.png'
import { PATHS } from '../constants/config'

const useStyle = makeStyles(theme => ({
  headerStyle: {
    backgroundColor: '#fff'
  },
  title: {
    flexGrow: 1,
  },
  titleLogo: {
    cursor: "pointer",
  },
  loginBtn: {
    marginRight: theme.spacing(2)
  },
  signUpBtn: {
    backgroundColor: "#eba134",
    color: '#fff'
  },
  avatar: {
    cursor: 'pointer',
  },
  icon: {
    marginRight: '10px',
  }
})
)


const AppHeader: React.FC = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const handleClick = (event: any) => setAnchorEl(event.currentTarget)
  const handleClose = () => setAnchorEl(null)
  const classes = useStyle()
  const history = useHistory()
  const goToWorksListPage = () => history.push('/works-list')
  const goToPostWorkPage = () => history.push('/post-work')
  const goToMyPage = () => history.push(`/mypage/${Store.getState().store.id}`)
  const logout = () => {
    const emptyUserInfo = {
      id: '',
      user: ''
    }
    Store.dispatch(Actions.updateUser(emptyUserInfo))
    history.push('/login')
  }
  if (Store.getState().store.user) {
    return (
      <AppBar position='static' className={classes.headerStyle}>
        <Toolbar>
          <div className={classes.title}>
            <img
              src={HeaderImg}
              className={classes.titleLogo}
              alt='First-Step'
              width='170px'
              height='50px'
              onClick={() => goToWorksListPage()}
            />
          </div>
          <Avatar
            src={`${PATHS.ICONS_FOLDER_URL}/${Store.getState().store.id}`}
            onClick={handleClick}
            className={classes.avatar}
          />
          <Menu
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem
              onClick={() => goToMyPage()}
            ><AccountBox color='inherit' className={classes.icon} />マイページ</MenuItem>
            <MenuItem
              onClick={() => goToPostWorkPage()}
            ><Create color='inherit' className={classes.icon} />投稿する</MenuItem>
            <MenuItem
              onClick={() => logout()}
            ><ExitToApp color='inherit' className={classes.icon} />ログアウト</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    )
  } else {
    return (
      <AppBar position='static' className={classes.headerStyle}>
        <Toolbar>
          <div className={classes.title}>
            <img
              src={HeaderImg}
              alt='First-Step'
              width='170px'
              height='50px'
              onClick={() => goToWorksListPage()}
            />
          </div>
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
