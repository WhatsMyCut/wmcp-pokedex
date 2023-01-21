import React, { useEffect } from 'react';
import { PokemonClient } from 'pokenode-ts';
import { useAppSelector, useAppDispatch } from '../hooks';
import { setCurrentPayload } from '../store/pokemonSlice';

import { PokeDex } from '../common/index';

function Dashboard(): JSX.Element {
  const dispatch = useAppDispatch();
  const selector = useAppSelector((state) => state.pokemon.data);

  useEffect(() => {
    const api = new PokemonClient();
    api
      .listPokemons()
      .then((data) => {
        console.log(data.results);
        dispatch(setCurrentPayload(data.results));
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

  return <PokeDex data={selector} />;
}
export default Dashboard;
