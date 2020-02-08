import React from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import Login from './components/contents/Login';
import Top from './components/pages/Top';

const Routes: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route path='/login' exact component={Login} />
        <Route path='/' exact component={Top} />
      </Switch>
      <Link to='/'>to Top</Link>
      <Link to='/login'>to Login</Link>
    </Router>
  );
}

export default Routes;
