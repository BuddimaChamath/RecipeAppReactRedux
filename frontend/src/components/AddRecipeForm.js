import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addRecipe } from '../store/recipesSlice';
import { useNavigate } from 'react-router-dom';

const AddRecipeForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [description, setDescription] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const validateForm = () => {
    const errors = [];
    if (name.trim().length < 4) errors.push('Recipe name must be at least 4 characters long.');
    if (!ingredients.trim()) errors.push('At least one ingredient is required.');
    if (description.trim().length < 10) errors.push('Description must be at least 10 characters long.');
    
    setErrorMessage(errors.join(' '));
    return errors.length === 0;
  };

  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (!validateForm()) return;
  
    // Define newRecipe object
    const newRecipe = {
      name: name.trim(),
      ingredients: ingredients.split(',').map((ing) => ing.trim()),
      description: description.trim(),
    };
  
    setIsSubmitting(true); // Disable the button while submitting
    dispatch(addRecipe(newRecipe))
      .unwrap()
      .then(() => {
        // Reset form fields after successful submission
        setName('');
        setIngredients('');
        setDescription('');
        navigate('/'); // Redirect to home
      })
      .catch((err) => {
        setErrorMessage(err || 'Failed to add recipe.');
      })
      .finally(() => {
        setIsSubmitting(false); // Re-enable the button after submission
      });
  };
  


  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow-sm">
            <div className="card-header bg-success text-white">
              <h2 className="mb-0">
                <i className="bi bi-plus-circle me-2"></i>
                Add Recipe
              </h2>
            </div>
            <div className="card-body">
              {errorMessage && (
                <div className="alert alert-danger">{errorMessage}</div>
              )}
              <form onSubmit={handleSubmit}>
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
                    placeholder="Enter recipe name"
                    required
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
                    placeholder="e.g. flour, sugar, eggs"
                    required
                  />
                  <div className="form-text">Separate each ingredient with a comma.</div>
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
                    placeholder="Describe your recipe..."
                    required
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
                  <button type="submit" className="btn btn-success" disabled={isSubmitting}>
  <i className="bi bi-save me-1"></i>
  {isSubmitting ? 'Saving...' : 'Save Recipe'}
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

export default AddRecipeForm;
