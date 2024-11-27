import React, { useEffect, useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { fetchRecipes, deleteRecipe, setSearchTerm, setSortOption } from '../store/recipesSlice';

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Select state from Redux store
  const { items: recipes, loading, error, searchTerm, sortOption } = useSelector(state => state.recipes);

  // Local state for handling delete confirmation modal
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [recipeToDelete, setRecipeToDelete] = useState(null);

  // Fetch recipes on component mount
  useEffect(() => {
    dispatch(fetchRecipes());
  }, [dispatch]);

  const filteredRecipes = useMemo(() => {
    let result = [...recipes]; // Create a shallow copy of the recipes array
  
    // Search filter
    if (searchTerm) {
      result = result.filter(recipe => 
        recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        recipe.ingredients.some(ing => 
          ing.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    // Sorting
    switch(sortOption) {
      case 'newest':
        return result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      case 'ingredients':
        return result.sort((a, b) => b.ingredients.length - a.ingredients.length);
      default:
        return result;
    }
  }, [recipes, searchTerm, sortOption]);

  // Delete recipe handler
  const handleDelete = (id) => {
    dispatch(deleteRecipe(id))  // Dispatch delete action from Redux
      .unwrap()
      .then(() => {
        setShowConfirmModal(false); // Hide the modal after successful deletion
        console.log("Recipe deleted");
      })
      .catch((err) => {
        console.error("Failed to delete recipe", err);
      });
  };

  // Error state
  if (error) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger d-flex justify-content-between align-items-center" role="alert">
          <span>{error}</span>
          <button className="btn btn-outline-danger btn-sm">
            Dismiss
          </button>
        </div>
      </div>
    );
  }

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

  return (
    <div className="container py-4">
      {/* Search and Sort Controls */}
      <div className="row mb-4">
        <div className="col-md-6">
          <input 
            type="text" 
            className="form-control" 
            placeholder="Search recipes..."
            value={searchTerm}
            onChange={(e) => dispatch(setSearchTerm(e.target.value))}
          />
        </div>
        <div className="col-md-6">
          <select 
            className="form-select"
            value={sortOption}
            onChange={(e) => dispatch(setSortOption(e.target.value))}
          >
            <option value="newest">Sort by Newest</option>
            <option value="ingredients">Sort by Ingredient Count</option>
          </select>
        </div>
      </div>

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="display-5">My Recipe Collection</h1>
        <button 
          className="btn btn-success btn-lg" 
          onClick={() => navigate('/add-recipe')}
        >
          <i className="bi bi-plus-circle me-2"></i>
          Add New Recipe
        </button>
      </div>

      {filteredRecipes.length === 0 ? (
        <div className="alert alert-info text-center" role="alert">
          <h4 className="alert-heading">No Recipes Found!</h4>
          <p>Try a different search or add a new recipe.</p>
        </div>
      ) : (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {filteredRecipes.map((recipe) => (
            <div key={recipe._id} className="col">
              <div className="card h-100 shadow-sm">
                <div className="card-body d-flex flex-column">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <h5 className="card-title mb-0">
                      <Link 
                        to={`/recipe/${recipe._id}`} 
                        className="text-decoration-none text-dark"
                      >
                        {recipe.name}
                      </Link>
                    </h5>
                    <span className="badge bg-secondary">
                      {recipe.ingredients.length} ingredients
                    </span>
                  </div>
                  <p className="card-text text-muted flex-grow-1">
                    {recipe.description.length > 100 
                      ? recipe.description.substring(0, 100) + '...' 
                      : recipe.description}
                  </p>
                  <div className="d-flex justify-content-between mt-3">
                    <button
                      className="btn btn-outline-warning"
                      onClick={() => navigate(`/edit-recipe/${recipe._id}`)}
                    >
                      <i className="bi bi-pencil me-1"></i>Edit
                    </button>
                    <button 
                      className="btn btn-outline-danger" 
                      onClick={() => { setRecipeToDelete(recipe); setShowConfirmModal(true); }}
                    >
                      <i className="bi bi-trash me-1"></i>Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

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
                  onClick={() => { handleDelete(recipeToDelete._id); setShowConfirmModal(false); }}
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

export default Home;
