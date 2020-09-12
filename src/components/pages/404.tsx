
import React from 'react';
import { withRouter, Link, useHistory } from 'react-router-dom'
import { AppBar, Toolbar, Button, Avatar, Menu, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyle = makeStyles(theme => ({}))

const NotFound: React.FC = () => {
  const history = useHistory()
  const goToWorksListPage = () => history.push('/works-list')
    return (
      <h2>NOT FOUND</h2>
    )
}

export default withRouter(NotFound)
