import React from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import AppHeader from './components/AppHeader';
import Login from './components/contents/Login'

function App() {
  return (
    <Router>
      <AppHeader></AppHeader>
      <Link to='/login'>to Login</Link>
      <Switch>
        <Route path='/login' exact component={Login}/>
      </Switch>
    </Router>
  );
}

export default App;
