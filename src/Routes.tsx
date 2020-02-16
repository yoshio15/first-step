import React from 'react';
import createBrowserHistory from 'history/createBrowserHistory'
import { Router, Route, Switch } from 'react-router-dom';
import Login from './components/contents/Login';
import SignUp from './components/pages/SignUp';
import Top from './components/pages/Top';
import AppHeader from './components/AppHeader'

let history = createBrowserHistory();
const Routes: React.FC = () => {
  return (
    <Router history={history}>
      <AppHeader></AppHeader>
      <Switch>
        <Route path='/sign-up' exact component={SignUp} />
        <Route path='/login' exact component={Login} />
        <Route path='/' exact component={Top} />
      </Switch>
      {/* <Link to='/'>to Top</Link>
      <Link to='/login'>to Login</Link> */}
    </Router>
  );
}

export default Routes;
