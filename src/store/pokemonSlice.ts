import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define a type for the slice state
interface NamedAPIResource {
  name: string;
  url: string;
}

interface DataState {
  data: NamedAPIResource[];
  viewHistory: [];
}

// Define the initial state using that type
const initialState: DataState = {
  data: [],
  viewHistory: [],
};

export const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {
    setCurrentPayload: (state, action: PayloadAction<any>) => {
      state.data = action.payload;
    },
  },
});

export const { setCurrentPayload } = pokemonSlice.actions;

export default pokemonSlice.reducer;
