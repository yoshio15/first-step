import React from 'react';
import Routes from './Routes';
import Amplify from 'aws-amplify';
import AwsConf from './aws/awsconfig'

Amplify.configure(AwsConf)

const App: React.FC = () => {
  return (
    <Routes></Routes>
  );
}

export default App;