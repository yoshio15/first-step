import React from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core';

const AppHeader = () => {
  return (
    <AppBar position='static'>
      <Toolbar>
        <Typography variant='h5'>
          FirstStep
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default AppHeader