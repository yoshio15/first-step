import React from 'react';
import createBrowserHistory from 'history/createBrowserHistory'
import { Router, Route, Switch } from 'react-router-dom';
import ReactGA from 'react-ga';
import { GOOGLE_ANALYTICS } from './constants/config';
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
import NotFound from './components/pages/404'

ReactGA.initialize(GOOGLE_ANALYTICS.TRACKING_ID);

let history = createBrowserHistory();
history.listen(({ pathname }) => {
  ReactGA.set({ page: pathname });
  ReactGA.pageview(pathname);
});

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
            <Route path='/work-description/:work_id/:user_id' exact component={WorkDescription} />
            <Route path='/mypage/:id' exact component={MyPage} />
            <Route path='/mypage/edit/:id' exact component={MyPageEdit} />
            <Route component={NotFound} />
          </Switch>
        </Auth>
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}

export default Routes;
