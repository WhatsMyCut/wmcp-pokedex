import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import store from './store/index';
import { PokemonClient } from 'pokenode-ts';

import { Dashboard } from './views/';
import './App.scss';

function App() {
  useEffect(() => {
    const api = new PokemonClient();
    api
      .listPokemons()
      .then((data) => {
        console.log({ data });
      })
      .catch((error) => console.error(error));

    //   fetch('https://pokeapi.co/docs/v2', {
    //     method: 'GET',
    //     mode: 'no-cors',
    //     headers: {
    //       'Content-Type': 'text/html',
    //     },
    //   })
    //     .then((result) => result.json())
    //     .then((data) => {
    //       console.log({ data });
    //     })
    //     .catch((e) => console.log({ e }));
  }, []);

  return (
    <Provider store={store}>
      <Dashboard />
    </Provider>
  );
}

export default App;
