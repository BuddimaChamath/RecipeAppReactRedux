import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';  // Import Provider from react-redux
import { store } from './store';  // Correct import of the store
import 'bootstrap/dist/css/bootstrap.min.css';


import Navbar from './components/Navbar';
import Home from './pages/Home';
import RecipeDetail from './pages/RecipeDetail';
import EditRecipe from './pages/EditRecipe';
import AddRecipeForm from './components/AddRecipeForm';

const App = () => {
  return (
    <Provider store={store}> {/* Wrap your app with the Provider and pass the store */}
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recipe/:id" element={<RecipeDetail />} />
          <Route path="/edit-recipe/:id" element={<EditRecipe />} />
          <Route path="/add-recipe" element={<AddRecipeForm />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
