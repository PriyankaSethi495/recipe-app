import { createSlice } from '@reduxjs/toolkit';

//Creating a slice named 'favorites'
const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: {
    //an empty array of items
    items: [],
  },
  //Reducers to update state
  reducers: {
    addFavorite: (state, action) => {
      // Check if the recipe is already in the favorites list or add to list
      const exists = state.items.find(item => item.idMeal === action.payload.idMeal);
      if (!exists) {
        state.items.push(action.payload);
      }
    },
    //reducer to remove a recipe from favorites
    removeFavorite: (state, action) => {
      state.items = state.items.filter(item => item.idMeal !== action.payload.idMeal);
    },
  },
});

//exporting actions and reducer function
export const { addFavorite, removeFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
