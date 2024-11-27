import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { fetchRecipes, deleteRecipe } from '../store/recipesSlice';

const RecipeDetail = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false); // State to control modal visibility
  const [recipeToDelete, setRecipeToDelete] = useState(null); // Recipe to be deleted
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Access recipes from Redux store
  const { items: recipes, loading, error } = useSelector((state) => state.recipes);

  // Fetch recipes if not already loaded
  useEffect(() => {
    if (!recipes.length) {
      dispatch(fetchRecipes());
    }
  }, [recipes, dispatch]);

  // Find the specific recipe to display
  const recipe = recipes.find((recipe) => recipe._id === id);

  // Delete recipe handler
  const handleDelete = () => {
    dispatch(deleteRecipe(recipeToDelete._id))
      .unwrap()
      .then(() => {
        setShowConfirmModal(false); // Hide the modal after successful deletion
        navigate('/'); // Redirect to home after deletion
      })
      .catch((err) => setErrorMessage(err || 'Failed to delete recipe.'));
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
  if (error || errorMessage) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger d-flex justify-content-between align-items-center" role="alert">
          <span>{errorMessage || error}</span>
          <Link to="/" className="btn btn-outline-danger btn-sm">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  // No recipe found
  if (!recipe) {
    return (
      <div className="container mt-4">
        <div className="alert alert-warning text-center" role="alert">
          <h4 className="alert-heading">Recipe Not Found</h4>
          <p>The recipe you are looking for does not exist.</p>
          <Link to="/" className="btn btn-warning">
            Back to Recipe List
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <div className="card shadow-lg">
            <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
              <h1 className="mb-0">
                <i className="bi bi-journal-text me-2"></i>
                {recipe.name}
              </h1>
              <div>
                <Link to={`/edit-recipe/${id}`} className="btn btn-outline-light me-2">
                  <i className="bi bi-pencil me-1"></i>
                  Edit
                </Link>
                <button onClick={() => { setRecipeToDelete(recipe); setShowConfirmModal(true); }} className="btn btn-outline-danger">
                  <i className="bi bi-trash me-1"></i>
                  Delete
                </button>
              </div>
            </div>

            <div className="card-body">
              <section className="mb-4">
                <h4 className="border-bottom pb-2 mb-3">
                  <i className="bi bi-list-ul me-2"></i>
                  Ingredients
                </h4>
                <ul className="list-group list-group-flush">
                  {recipe.ingredients.map((ingredient, index) => (
                    <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                      {ingredient}
                      <span className="badge bg-primary rounded-pill">{index + 1}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <section>
                <h4 className="border-bottom pb-2 mb-3">
                  <i className="bi bi-info-circle me-2"></i>
                  Description
                </h4>
                <p className="card-text text-muted">{recipe.description}</p>
              </section>
            </div>

            <div className="card-footer text-muted d-flex justify-content-between">
              <small>
                <i className="bi bi-clock me-1"></i>
                Created: {new Date(recipe.createdAt).toLocaleDateString()}
              </small>
              {recipe.updatedAt && (
                <small>
                  <i className="bi bi-pencil me-1"></i>
                  Last Updated: {new Date(recipe.updatedAt).toLocaleDateString()}
                </small>
              )}
            </div>
          </div>

          <div className="mt-3 text-center">
            <Link to="/" className="btn btn-secondary">
              <i className="bi bi-arrow-left me-1"></i>
              Back to Recipe List
            </Link>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showConfirmModal && (
        <div className="modal show" tabIndex="-1" style={{ display: 'block' }} aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Confirm Deletion</h5>
                <button type="button" className="btn-close" onClick={() => setShowConfirmModal(false)} aria-label="Close"></button>
              </div>
              <div className="modal-body">
                Are you sure you want to delete this recipe?
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowConfirmModal(false)}>Cancel</button>
                <button 
                  type="button" 
                  className="btn btn-danger" 
                  onClick={handleDelete}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipeDetail;
