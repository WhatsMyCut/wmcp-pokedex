import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Pokemon } from 'pokenode-ts';

// Define a type for the slice state
interface NamedAPIResource {
  name: string;
  url: string;
}

interface DataState {
  currentPokemon: Pokemon | undefined;
  selected: NamedAPIResource;
  data: NamedAPIResource[];
  viewHistory: [];
}

// Define the initial state using that type
const initialState: DataState = {
  currentPokemon: undefined,
  selected: { name: '', url: '' },
  data: [],
  viewHistory: [],
};

export const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {
    setCurrentPayload: (state, action: PayloadAction<NamedAPIResource[]>) => {
      state.data = action.payload;
    },
    setSelected: (state, action: PayloadAction<NamedAPIResource>) => {
      state.selected = action.payload;
    },
    setCurrentPokemon: (state, action: PayloadAction<Pokemon>) => {
      state.currentPokemon = action.payload;
    },
  },
});

export const { setCurrentPayload, setCurrentPokemon, setSelected } =
  pokemonSlice.actions;

export default pokemonSlice.reducer;
