import { Pokemon, PokemonClient } from 'pokenode-ts';
import {
  setCurrentPayload,
  setCurrentPokemon,
  setSelected,
} from '../store/pokemonSlice';
import { useAppDispatch, useAppSelector } from '../hooks';

const dispatch = useAppDispatch();
const data = useAppSelector((state) => state.pokemon.data);
const selected = useAppSelector((state) => state.pokemon.selected);

const api = new PokemonClient();

const fetchAllPokemon = () => {
  api
    .listPokemons()
    .then((data) => {
      dispatch(setCurrentPayload(data));
      if (selected.name !== data.results[0].name) {
        dispatch(setSelected(data.results[0]));
      }
    })
    .catch((error) => console.error(error));
};

const getSelectedPokemon = (): Promise<void | Pokemon> => {
  return api
    .getPokemonByName(selected?.name)
    .then((pk) => {
      dispatch(setCurrentPokemon(pk));
      return pk;
    })
    .catch((error) => console.error(error));
};

export { fetchAllPokemon, getSelectedPokemon };
