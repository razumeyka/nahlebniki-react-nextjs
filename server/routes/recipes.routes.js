const { Router } = require('express');
const router = Router();
const recipesController = require('../controllers/recipes');

router.get('/', recipesController.getAll);
router.get('/cuisines', recipesController.getCuisines);
router.get('/categories', recipesController.getCategories);
router.get('/categories/:id', recipesController.getByCategory);
router.get('/:id', recipesController.getById);
router.post('/search', recipesController.searchRecipe);

module.exports = router;