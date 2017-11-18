const mongoCollections = require("../config/mongoCollections");
const recipes = mongoCollections.recipes;
const uuid = require("node-uuid");

const exportedMethods = {
    /* Creating a Recipe */
    async createRecipe(title, ingredients, steps, comments) {
        try {
            if (typeof title !== "string") throw "No title provided";

            if (!Array.isArray(comments)) {
                comments = [];
            }

            const recipeCollection = await recipes();

            const newRecipe = {
                _id: uuid.v4(),
                title: title,
                ingredients: ingredients,
                steps: steps,
                comments: comments

            };

            const newInsrtedRecipe = await recipeCollection.insertOne(newRecipe);
            const newId = newInsrtedRecipe.insertedId;
            return await this.getRecipeById(newId);
        } catch (e) {
            throw "Trouble creating the recipe";
        }

    },

    /* Getting all the contents of the Recipe By Id*/
    async getRecipeById(id) {
        try {
            if (!id) throw "No Id Provided";
            const recipeCollection = await recipes();
            const recipe = await recipeCollection.findOne({ _id: id });
            if (!recipe) throw "Recipe Not Found";
            return recipe;
        } catch (e) {
            throw "Can't get recipe by id";
        }

    },
    
    /* Get all the Recipes with Title and Id*/
    async getAllRecipes() {
        try {
            const recipeCollection = await recipes();

            const allRecipes = await recipeCollection.find({}, { title: 1 }).toArray();

            return allRecipes;
        } catch (e) {
            throw "trouble getting all the recipes";
        }
    },

    /* Update the Recipe */
    async updateRecipe(id, updatedRecipe) {
        const recipeCollection = await recipes();
        try {
            await this.getRecipeById(id);
            const updatedRecipeData = {};
            updatedRecipeData.ingredients = updatedRecipe.ingredients;

            if (updatedRecipe.title) {
                updatedRecipeData.title = updatedRecipe.title;
            }

            if (updatedRecipe.steps) {
                updatedRecipeData.steps = updatedRecipe.steps;
            }
            let updateCommand = {
                $set: updatedRecipeData
            };
            const query = {
                _id: id
            };
            await recipeCollection.updateOne(query, updateCommand);

            return await this.getRecipeById(id);
        } catch (e) {
            throw "Recipe is not available";
        }


    },

    /* Delete the Recipe */
    async removeRecipe(id) {
        try {
            const recipeCollection = await recipes();
            await recipeCollection.removeOne({ _id: id });
        } catch (e) {
            throw "There is some error in deleting the recipe";
        }

    },

    /* Creating a comment for the recipe */
    async createComment(id, poster, comment) {
        if (typeof poster !== "string") throw "No Name provided";
        if (typeof comment !== "string") throw "No Comment provided";
        try {
            const recipeCollection = await recipes();

            const newComment = {
                _id: uuid.v4(),
                poster: poster,
                comment: comment

            };

            const insertComment = await recipeCollection.update({ _id: id }, { $addToSet: { comments: newComment } });
            console.log(newComment);
            const newId = insertComment.insertedId;
            return await this.getCommentDetailsForCommentId(newComment._id);
        } catch (e) {
            throw "Cannot create a comment";
        }

    },

    /*Get all the comments for the recipe */
    async getAllCommentsForRecipe(recipeId) {
        if (!recipeId) throw "Please provide Recipe Id";
        try {
            const recipeCollection = await recipes();
            const recipe = await recipeCollection.findOne({ '_id': recipeId });
            if (!recipe) throw "No Recipe Found 123";
            const recipeComments = recipe.comments;
            if(recipeComments.length <= 0) throw "No Comments avalilable for this Recipe";
            const allComments = [];
            for (let c of recipeComments) {
                allComments.push({
                    _id: c._id,
                    recipeId: recipe._id,
                    recipeTitle: recipe.title,
                    poster: c.poster,
                    comment: c.comment
                })
            }
            return allComments;
        } catch (e) {
            throw e;
        }

    },

    /* Get the comments and Recipe details for the particular comment by ID*/
    async getCommentDetailsForCommentId(commentId) {
        try {
            if (!commentId) throw "Please provide the Comment ID";
            const recipeCollection = await recipes();
            const commentDetails = await recipeCollection.find({ "comments._id": commentId }, { 'comments.$': 1, title: 1 }).toArray();
            if (commentDetails.length <= 0) throw "No Comment exists";
            const commentsContent = commentDetails[0].comments;
            return {
                _id: commentId,
                recipeId: commentDetails[0]._id,
                recipeTitle: commentDetails[0].title,
                poster: commentsContent[0].poster,
                comment: commentsContent[0].comment
            };
        } catch (e) {
            throw "Trouble getting comment detials for the comment";
        }

    },

    // Check recipe exists or nor for the given Comment ID
    async findRecipe(commentId) {
        try {
            if (!commentId) throw "Provide comment Id to check the recipe exists or not";
            const recipeCollection = await recipes();
            const recipe = await recipeCollection.findOne({ 'comments._id': commentId });
            if (!recipe) throw "Recipe Not Found";
            return recipe;
        } catch (e) {
            throw "Cannot find the recipe";
        }

    },

    //Updating the comment given recipeId, CommentId and Changed values
    async updatedCommentDetails(recipeId, commentId, updatedCommentBody) {
        try {
            if (!recipeId || !commentId) throw "Provide comment Id and recipe Id";
            const recipeCollection = await recipes();
            const updatedCommentData = {};
            const recipe = await this.findRecipe(commentId);
            const arrrayComments = [];
            //Getting the comment details
            const commentDetails = await recipeCollection.find({ "comments._id": commentId }, { 'comments.$': 1, title: 1, _id: 1 }).toArray();
            if (!(recipeId === commentDetails[0]._id)) throw "This Comment and Recipe does not go together.";
            if (commentDetails.length <= 0) throw "No Comment exists";
            const commentsContent = commentDetails[0].comments;
            //Making the update comment value
            updatedCommentData._id = commentId;
            if (updatedCommentBody.poster) {
                updatedCommentData.poster = updatedCommentBody.poster;
            } else {
                updatedCommentData.poster = commentsContent[0].poster;
            }

            if (updatedCommentBody.comment) {
                updatedCommentData.comment = updatedCommentBody.comment;
            } else {
                updatedCommentData.comment = commentsContent[0].comment;
            }

            let updateCommand = {
                $set: { 'comments.$': updatedCommentData }
            };
            await recipeCollection.updateOne({ _id: recipeId, 'comments._id': commentId }, updateCommand);
            return await this.getCommentDetailsForCommentId(commentId);
        } catch (e) {
            throw "cannot update the comment details";
        }

    },

    //Deleting the comment given Id
    async deleteCommentById(id) {
        try {
            if (!id) throw "Provide comment Id";
            const recipeCollection = await recipes();
            const recipe = await this.findRecipe(id);
            await recipeCollection.update({ _id: recipe._id }, { $pull: { comments: { _id: id } } });
            return await this.getCommentDetailsForCommentId(id);
        } catch (e) {
            throw "cannot delete the comment";
        }

    },

}

module.exports = exportedMethods;