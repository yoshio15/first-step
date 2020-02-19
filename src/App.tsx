import React from 'react';
import Routes from './Routes';
import { Provider } from 'react-redux';
import Store from './store/index'
import Amplify from 'aws-amplify';
import AwsConf from './aws/awsconfig'

Amplify.configure(AwsConf)

const App: React.FC = () => {
  return (
    <Provider store={Store}>
      <Routes />
    </Provider>
  );
}

export default App;