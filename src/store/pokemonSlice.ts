import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NamedAPIResourceList, Pokemon } from 'pokenode-ts';

// Define a type for the slice state
interface NamedAPIResource {
  name: string;
  url: string;
}

interface DataState {
  currentPokemon: Pokemon | undefined;
  selected: NamedAPIResource;
  data: NamedAPIResourceList | undefined;
  viewHistory: NamedAPIResource[];
}

// Define the initial state using that type
const initialState: DataState = {
  currentPokemon: undefined,
  selected: { name: '', url: '' },
  data: undefined,
  viewHistory: [],
};

export const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {
    setCurrentPayload: (state, action: PayloadAction<NamedAPIResourceList>) => {
      state.data = action.payload;
    },
    setSelected: (state, action: PayloadAction<NamedAPIResource>) => {
      state.selected = action.payload;
      state.viewHistory.push(action.payload);
    },
    setCurrentPokemon: (state, action: PayloadAction<Pokemon>) => {
      state.currentPokemon = action.payload;
    },
    setNewPokemon: (state, action) => {
      state.data?.results.concat(action.payload);
    },
  },
});

export const {
  setCurrentPayload,
  setCurrentPokemon,
  setSelected,
  setNewPokemon,
} = pokemonSlice.actions;

export default pokemonSlice.reducer;
