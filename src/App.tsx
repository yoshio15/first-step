import React from 'react';
import Routes from './Routes';
import AppHeader from './components/AppHeader'

const App: React.FC = () => {
  return (
    <div>
      <AppHeader></AppHeader>
      <Routes></Routes>
    </div>
  );
}

export default App;

