import React from 'react';
import { Link } from 'react-router-dom';

function RecipeCard({ recipe, onDelete }) {
  return (
    <div className="card mb-3">
      <div className="card-body">
        <h5 className="card-title">{recipe.name}</h5>
        <div className="d-flex justify-content-between">
          <Link to={`/recipe/${recipe._id}`} className="btn btn-info btn-sm">
            View
          </Link>
          <Link to={`/edit/${recipe._id}`} className="btn btn-warning btn-sm">
            Edit
          </Link>
          <button 
            onClick={() => onDelete(recipe._id)} 
            className="btn btn-danger btn-sm"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default RecipeCard;