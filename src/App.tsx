import React from 'react';
import './App.css';
import store from './store/index';
import { Provider } from 'react-redux';
import Dashboard from './common/Dashboard';

function App() {
  return (
    <Provider store={store}>
      <Dashboard />
    </Provider>
  );
}

export default App;
