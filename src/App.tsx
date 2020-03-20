import React from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import Routes from './Routes';
import { Provider } from 'react-redux';
import Store, { persistor } from './store/index'
import Amplify from 'aws-amplify';
import AwsConf from './aws/awsconfig'

Amplify.configure(AwsConf)

const App: React.FC = () => {
  return (
    <Provider store={Store}>
      <PersistGate loading={null} persistor={persistor}>
        <Routes />
      </PersistGate>
    </Provider>
  );
}

export default App;