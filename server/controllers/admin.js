const Recipe = require('../models/Recipe');

const createRecipe = async (req, res) => {
    try {
        const recipe = req.body;

        const recipeMainPhoto = req.files.find(file => file.fieldname === 'image');
        const recipeMainPhotoUrl = recipeMainPhoto ? recipeMainPhoto.path.replace('client/public', '') : null;
        const recipeBackstageUrl = req.files.filter(file => file.fieldname === 'backstageImage').map( file => file.path.replace('client/public', ''));
        const recipeSteps = JSON.parse(recipe.steps).map( step => {
            const image = req.files.find(file => file.fieldname === `stepImage-${step.stepNumber}`);
            const imageUrl = image ? image.path.replace('client/public', '') : null;

            return { ...step, imageUrl };
        });
        const recipeIngredients = JSON.parse(recipe.ingredients);

        const newRecipe = new Recipe({
            title: recipe.title,
            imageUrl: recipeMainPhotoUrl,
            backstageImagesUrl: recipeBackstageUrl,
            author: recipe.author,
            authorCountry: recipe.authorCountry,
            originCountry: recipe.originCountry,
            description: recipe.description,
            categories: recipe.categories,
            serving: recipe.serving,
            isIngredientsGrouped: recipe.isIngredientsGrouped,
            ingredients: recipeIngredients,
            steps: recipeSteps
        });

        await newRecipe.save();

        res.status(201).json({ message: 'Recipe successfully created!' });
    } catch (err) {
        console.log(err);
    }
};

module.exports = {
    createRecipe,
};