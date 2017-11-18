const express = require("express");
const router = express.Router();
const data = require("../data");
const recipeData = data.recipes;

router.post("/:id", async(req, res) => {
    const id = req.params.id;
    const newComments = req.body;
    /*Check  if the recipe exists in the Databse, if so proceed otherwise return an error */
    try {
        await recipeData.getRecipeById(id);
        const { poster, comment } = newComments;
        const recipe = await recipeData.createComment(id, poster, comment);
        res.json(recipe);
    } catch (e) {
        console.log(e);
        res.status(500).json({ error: e });
    }
});

router.get("/recipe/:id", async(req, res) => {
    const recipeId = req.params.id;
    /*Check  if the recipe exists in the Databse, if so proceed otherwise return and error */
    try {
        await recipeData.getRecipeById(recipeId);
        const comments = await recipeData.getAllCommentsForRecipe(recipeId);
        res.json(comments);
    } catch (e) {
        console.log(e);
        res.status(500).json({ error: e });
    }
});

router.get("/:id", async(req, res) => {
    const commentId = req.params.id;
    /*Check  if the recipe exists in the Databse, if so proceed otherwise return an error */
    try {
        await recipeData.findRecipe(commentId);
        const comment = await recipeData.getCommentDetailsForCommentId(commentId);
        res.json(comment);
    } catch (e) {
        res.status(404).json({ error: e });
    }
});

router.put("/:id/:id2", async(req, res) => {
    const recipeId = req.params.id;
    const commentId = req.params.id2;
    const updatedCommentBody = req.body;
    /*Check  if the recipe adn comments exists in the Databse, if so proceed otherwise return an error */
    try {
        await recipeData.getRecipeById(recipeId);
        await recipeData.getCommentDetailsForCommentId(commentId);
        console.log(updatedCommentBody);
        const updatedComment = await recipeData.updatedCommentDetails(recipeId, commentId, updatedCommentBody);
        res.json(updatedComment);
    } catch (e) {
        console.log(e);
        res.status(500).json({ error: e });
    }

});

router.delete("/:id", async(req, res) => {
    const commentId = req.params.id;
  /*Check  if the recipe exists in the Databse, if so proceed otherwise return an error */
    try {
        await recipeData.getCommentDetailsForCommentId(commentId);
        const deletionInfo = recipeData.deleteCommentById(commentId);
        if (deletionInfo) {
            res.json({ info: `Comment Deleted` });
        }
    } catch (e) {
        res.status(500).json({ error: e });
    }
});

module.exports = router;