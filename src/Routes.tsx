import React from 'react';
import createBrowserHistory from 'history/createBrowserHistory'
import { Router, Route, Switch } from 'react-router-dom';
import AppHeader from './components/AppHeader'
import Auth from './components/Auth'
import Login from './components/pages/Login';
import SignUp from './components/pages/SignUp';
import Top from './components/pages/Top';
import SignUpDone from './components/pages/SignUpDone'
import WorksList from './components/pages/WorksList'
import PostWork from './components/pages/PostWork'
import WorkDescription from './components/pages/WorkDescription'
import MyPage from './components/pages/MyPage'
import MyPageEdit from './components/pages/MyPageEdit'

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
        <Auth>
          <Switch>
            <Route path='/works-list' exact component={WorksList} />
            <Route path='/post-work' exact component={PostWork} />
            <Route path='/work-description/:id' exact component={WorkDescription} />
            <Route path='/mypage/:id' exact component={MyPage} />
            <Route path='/mypage/edit/:id' exact component={MyPageEdit} />
          </Switch>
        </Auth>
      </Switch>
    </Router>
  );
}

export default Routes;
