const express = require("express");
const router = express.Router();
const data = require("../data");
const recipeData = data.recipes;

// Get all the reipes
router.get("/", async(req, res) => {
    try {
        const recipes = await recipeData.getAllRecipes();
        res.json(recipes);
    } catch (e) {
        res.status(500).json({ error: e });
    }
});

//Creare a new Recipe
router.post("/", async(req, res) => {
    const newRecipeData = req.body;
    try {
        const { title, ingredients, steps, comments } = newRecipeData;
        const newRecipe = await recipeData.createRecipe(title, ingredients, steps, comments);

        res.json(newRecipe);
    } catch (e) {
        res.status(500).json({ error: e });
    }
});

//Get recipe details given recipe id
router.get("/:id", async(req, res) => {
    const id = req.params.id;
    try {
        const recipe = await recipeData.getRecipeById(id);

        res.json(recipe);
    } catch (e) {
        res.status(500).json({ error: e });
    }
});

//Update the recipe given recipe id and updated body
router.put("/:id", async(req, res) => {
    const id = req.params.id;
    const updatedRecipeData = req.body;
    try {
        await recipeData.getRecipeById(id);
    } catch (e) {
        res.status(404).json({ error: "Recipe not found" });
    }

    try {
        const recipe = await recipeData.updateRecipe(id, updatedRecipeData);
        res.json(recipe);
    } catch (e) {
        console.log(e);
        res.status(500).json({ error: e });
    }
});

//Delete the recipe given recipe id
router.delete("/:id", async(req, res) => {
    const id = req.params.id;
    try {
        const deletionInfo = await recipeData.getRecipeById(id);
        await recipeData.removeRecipe(id);
        res.json({info: "Item Deleted"});
    } catch (e) {
      console.log(e);
        res.status(500).json({ error: e });
    }
});


module.exports = router;