import React from 'react';
import { Provider } from 'react-redux';
import store from './store/index';
import { Dashboard } from './views/';
import './App.scss';

function App() {
  return (
    <Provider store={store}>
      <Dashboard />
    </Provider>
  );
}

export default App;
