import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async action to fetch recipes
export const fetchRecipes = createAsyncThunk(
  'recipes/fetchRecipes',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('http://localhost:5000/recipes');
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch recipes.');
    }
  }
);

// Async action to add a recipe
export const addRecipe = createAsyncThunk(
  'recipes/addRecipe',
  async (recipe, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:5000/recipes', recipe);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to add recipe.');
    }
  }
);

// Async action to edit a recipe
export const editRecipe = createAsyncThunk(
  'recipes/editRecipe',
  async (updatedRecipe, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/recipes/${updatedRecipe._id}`,
        updatedRecipe
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to update recipe.');
    }
  }
);

// Async action to delete a recipe
export const deleteRecipe = createAsyncThunk(
  'recipes/deleteRecipe',
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`http://localhost:5000/recipes/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to delete recipe.');
    }
  }
);

const recipesSlice = createSlice({
  name: 'recipes',
  initialState: {
    items: [], // All recipes
    loading: false, // Loading state
    error: null, // Error messages
    searchTerm: '', // Search query
    sortOption: 'newest', // Sorting option
  },
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setSortOption: (state, action) => {
      state.sortOption = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Recipes
      .addCase(fetchRecipes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRecipes.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchRecipes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Add Recipe
      .addCase(addRecipe.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addRecipe.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
      })
      .addCase(addRecipe.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Edit Recipe
      .addCase(editRecipe.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editRecipe.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.map((recipe) =>
          recipe._id === action.payload._id ? action.payload : recipe
        );
      })
      .addCase(editRecipe.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete Recipe
      .addCase(deleteRecipe.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteRecipe.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter((recipe) => recipe._id !== action.payload);
      })
      .addCase(deleteRecipe.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export actions for search and sort
export const { setSearchTerm, setSortOption } = recipesSlice.actions;

// Export the reducer
export default recipesSlice.reducer;
