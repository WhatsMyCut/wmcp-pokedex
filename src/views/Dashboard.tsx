import React, { useEffect } from 'react';
import { setCurrentPayload, setSelected } from '../store/pokemonSlice';
import { useAppDispatch, useAppSelector } from '../hooks';

import { PokeDex, ViewHistory } from '../common/index';
import { PokemonClient } from 'pokenode-ts';

function Dashboard(): JSX.Element {
  const api = new PokemonClient();
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.pokemon.data);
  const selected = useAppSelector((state) => state.pokemon.selected);

  useEffect(() => {
    if (!data) {
      api
        .listPokemons()
        .then((data) => {
          dispatch(setCurrentPayload(data));
          if (selected.name !== data.results[0].name) {
            dispatch(setSelected(data.results[0]));
          }
        })
        .catch((error) => console.error(error));
    }
  }, []);

  return (
    <>
      <div className="container">
        <div>
          <PokeDex />
        </div>
        <div>
          <ViewHistory />
        </div>
      </div>
    </>
  );
}
export default Dashboard;
