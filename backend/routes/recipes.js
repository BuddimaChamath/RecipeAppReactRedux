const express = require("express");
const Recipe = require("../models/Recipe");
const router = express.Router();

// Create a recipe
router.post("/", async (req, res) => {
  try {
    const { name, ingredients, description } = req.body;
    
    // Validate input
    if (!name || !ingredients || !description) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newRecipe = new Recipe({ name, ingredients, description });
    await newRecipe.save();
    
    res.status(201).json(newRecipe);
  } catch (err) {
    console.error("Error creating recipe:", err);
    res.status(500).json({ 
      message: "Error creating recipe", 
      error: process.env.NODE_ENV === 'development' ? err.message : null 
    });
  }
});

// Get all recipes
router.get("/", async (req, res) => {
  try {
    const recipes = await Recipe.find().sort({ createdAt: -1 });
    res.status(200).json(recipes);
  } catch (err) {
    console.error("Error fetching recipes:", err);
    res.status(500).json({ 
      message: "Error fetching recipes", 
      error: process.env.NODE_ENV === 'development' ? err.message : null 
    });
  }
});

// Get a single recipe by ID
router.get("/:id", async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }
    
    res.status(200).json(recipe);
  } catch (err) {
    console.error("Error fetching recipe:", err);
    res.status(500).json({
      message: "Error fetching recipe",
      error: process.env.NODE_ENV === 'development' ? err.message : null
    });
  }
});

// Update a recipe by ID
router.put("/:id", async (req, res) => {
  try {
    const updatedRecipe = await Recipe.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true, runValidators: true }
    );
    
    if (!updatedRecipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }
    
    res.status(200).json(updatedRecipe);
  } catch (err) {
    console.error("Error updating recipe:", err);
    res.status(500).json({
      message: "Error updating recipe",
      error: process.env.NODE_ENV === 'development' ? err.message : null
    });
  }
});

// Delete a recipe
router.delete("/:id", async (req, res) => {
  try {
    const deletedRecipe = await Recipe.findByIdAndDelete(req.params.id);
    
    if (!deletedRecipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }
    
    res.status(200).json({ message: "Recipe deleted successfully" });
  } catch (err) {
    console.error("Error deleting recipe:", err);
    res.status(500).json({ 
      message: "Error deleting recipe", 
      error: process.env.NODE_ENV === 'development' ? err.message : null 
    });
  }
});

module.exports = router;