import React from 'react';
import AppNavigation from './src/navigation/appNavigation';
import Toast from 'react-native-toast-message';

const App = () => {

  return (
    <>
      <AppNavigation />
      <Toast />
    </>
  );
}

export default App;
