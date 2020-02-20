import React from 'react'
import { Redirect } from 'react-router-dom'
import Store from '../store/index'

const Auth = (props: any) => (Store.getState().store.user ? props.children : <Redirect to={'/login'} />)

export default Auth