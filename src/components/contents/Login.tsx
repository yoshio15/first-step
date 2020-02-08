import React from 'react';
import { Container, Button, TextField, Typography } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

const Login = () => {
  return (
    <Container>
      <Typography component="h1" variant="h5">
        <LockOutlinedIcon color='primary' />
        Sign in
      </Typography>
      <TextField variant='outlined' margin='normal' label='メールアドレス' autoFocus required fullWidth></TextField>
      <TextField variant='outlined' margin='normal' label='パスワード' required fullWidth></TextField>
      <Button variant='contained' color='primary' fullWidth>Login</Button>
    </Container>
  )
}

export default Login