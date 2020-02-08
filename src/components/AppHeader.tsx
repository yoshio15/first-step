import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';

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

const AppHeader = () => {
  const classes = useStyle()
  return (
    <AppBar position='static' className={classes.headerStyle}>
      <Toolbar>
        <Typography variant='h5' className={classes.title}>
          First-Step
        </Typography>
       <Button className={classes.loginBtn}>ログイン</Button> 
       <Button className={classes.signUpBtn}>無料会員登録</Button> 
      </Toolbar>
    </AppBar>
  );
}

export default AppHeader