const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');

/**
 * App Routes 
*/
router.get('/view-clients', clientController.getClientList);
router.get('/create-client', clientController.createClient);
router.post('/create-client', clientController.storeClient);
// router.get('/recipe/:id', recipeController.exploreRecipe );
// router.get('/categories', recipeController.exploreCategories);
// router.get('/categories/:id', recipeController.exploreCategoriesById);
// router.post('/search', recipeController.searchRecipe);
// router.get('/explore-latest', recipeController.exploreLatest);
// router.get('/explore-random', recipeController.exploreRandom);
// router.get('/submit-recipe', recipeController.submitRecipe);
// router.post('/submit-recipe', recipeController.submitRecipeOnPost);

 
module.exports = router;