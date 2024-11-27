import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchRecipes, editRecipe } from '../store/recipesSlice';

const EditRecipe = () => {
  const [name, setName] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [description, setDescription] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Access recipes from Redux store
  const { items: recipes, loading, error } = useSelector((state) => state.recipes);

  // Find the specific recipe to edit
  useEffect(() => {
    const recipe = recipes.find((recipe) => recipe._id === id);
    
    if (recipe) {
      // Only set state if the recipe was found
      setName(recipe.name);
      setIngredients(recipe.ingredients.join(', '));
      setDescription(recipe.description);
    } else {
      dispatch(fetchRecipes());
    }
  }, [id, recipes, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission

    // Validate fields
    if (name.length < 4) {
      setErrorMessage('Title must be at least 4 characters long');
      return; // Stop the submit action
    }

    const ingredientsList = ingredients.split(',').map((ingredient) => ingredient.trim());
    if (ingredientsList.length === 0 || ingredientsList.some((ingredient) => ingredient === '')) {
      setErrorMessage('Please add at least one ingredient');
      return; // Stop the submit action
    }

    if (description.length < 10) {
      setErrorMessage('Description must be at least 10 characters long');
      return; // Stop the submit action
    }

    // Clear error message if validation passes
    setErrorMessage('');

    // Prepare updated recipe
    const updatedRecipe = {
      _id: id,
      name: name.trim(),
      ingredients: ingredientsList,
      description: description.trim(),
    };

    // Dispatch Redux action to update recipe
    dispatch(editRecipe(updatedRecipe))
      .unwrap()
      .then(() => {
        localStorage.setItem('recipeUpdateMessage', 'Recipe successfully updated!');
        navigate('/');  // Redirect after successful form submission
      })
      .catch((err) => {
        setErrorMessage(err || 'Failed to update recipe. Please try again.');
      });
  };

  // Loading state
  if (loading) {
    return (
      <div className="container text-center mt-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  // Error state
  if (errorMessage || error) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger d-flex justify-content-between align-items-center" role="alert">
          <span>{errorMessage || error}</span>
          <button
            onClick={() => navigate('/')}
            className="btn btn-outline-danger btn-sm"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow-sm">
            <div className="card-header bg-primary text-white">
              <h2 className="mb-0">
                <i className="bi bi-pencil-square me-2"></i>
                Edit Recipe
              </h2>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                <div className="mb-3">
                  <label htmlFor="recipeName" className="form-label">
                    Recipe Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="recipeName"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder="Enter recipe name"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="ingredients" className="form-label">
                    Ingredients
                    <small className="text-muted ms-2">(comma-separated)</small>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="ingredients"
                    value={ingredients}
                    onChange={(e) => setIngredients(e.target.value)}
                    required
                    placeholder="e.g. flour, sugar, eggs"
                  />
                  <div className="form-text">Separate each ingredient with a comma</div>
                </div>

                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <textarea
                    className="form-control"
                    id="description"
                    rows="4"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    placeholder="Describe your recipe, cooking method, or any special notes"
                  />
                </div>

                <div className="d-flex justify-content-between">
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => navigate(-1)}
                  >
                    <i className="bi bi-arrow-left me-1"></i>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    <i className="bi bi-save me-1"></i>
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditRecipe;
