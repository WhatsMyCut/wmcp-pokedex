import { useEffect } from 'react';
import {
  NamedAPIResource,
  NamedAPIResourceList,
  Pokemon,
  PokemonClient,
} from 'pokenode-ts';
import { setCurrentPayload, setCurrentPokemon } from '../store/pokemonSlice';
import { useAppDispatch, useAppSelector } from '../hooks';

const api = new PokemonClient();

const APIService = {
  getSelectedPokemon: function (
    selected: NamedAPIResource
  ): Promise<void | Pokemon> {
    return api
      .getPokemonByName(selected?.name)
      .then((pk) => {
        const dispatch = useAppDispatch();
        dispatch(setCurrentPokemon(pk));
        return pk;
      })
      .catch((error) => console.error(error));
  },

  fetchAllPokemon: function (): Promise<void | NamedAPIResourceList> {
    return api
      .listPokemons()
      .then((data) => {
        const dispatch = useAppDispatch();
        dispatch(setCurrentPayload(data));
        return data;
      })
      .catch((error) => console.error(error));
  },
};

export default APIService;
