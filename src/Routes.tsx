import React from 'react';
import createBrowserHistory from 'history/createBrowserHistory'
import { Router, Route, Switch } from 'react-router-dom';
import AppHeader from './components/AppHeader'
import Login from './components/pages/Login';
import SignUp from './components/pages/SignUp';
import Top from './components/pages/Top';
import SignUpDone from './components/pages/SignUpDone'
import WorksList from './components/pages/WorksList'

let history = createBrowserHistory();
const Routes: React.FC = () => {
  return (
    <Router history={history}>
      <AppHeader></AppHeader>
      <Switch>
        <Route path='/' exact component={Top} />
        <Route path='/login' exact component={Login} />
        <Route path='/sign-up' exact component={SignUp} />
        <Route path='/sign-up-done' exact component={SignUpDone} />
        <Route path='/works-list' exact component={WorksList} />
      </Switch>
    </Router>
  );
}

export default Routes;
