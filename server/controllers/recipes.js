const Recipe = require('../models/Recipe');
const Cuisine = require('../models/Сuisine');
const Category = require('../models/Category');

const getAll = async (req, res) => {
    try {
        const all = await Recipe.find();
        const travel = await Recipe.find({ categories: 'Travel' });
        const backpacking = await Recipe.find({ categories: 'Backpacking' });
        const vegetarian = await Recipe.find({ categories: 'Vegetarian' });

        const recipes = { all, travel, backpacking, vegetarian };

        res.status(200).json(recipes);
    } catch (err) {
        console.log(err);
    }
};

const getById = async (req, res) => {
    try {
        const { id } = req.params;
        const recipe = await Recipe.findById(id);

        res.status(200).json(recipe);
    } catch (err) {
        console.log(err);
    }
};

const getCuisines = async (req, res) => {
    try {
        const cuisines = await Cuisine.find();

        res.status(200).json(cuisines);
    } catch (error) {
        res.status(500).send({ message: error.message || 'Error occured'})
    }
};

const getCategories = async (req, res) => {
    try {
        const categories = await Category.find();

        res.status(200).json(categories);
    } catch (error) {
        res.status(500).send({ message: error.message || 'Error occured'})
    }
};

const getByCategory = async (req, res) => {
    try {
        const { id } = req.params;

        const category = await Category.findById(id);

        res.status(200).json({ message: 'Success' });
    } catch (error) {
        res.status(500).send({ message: error.message || 'Error occured'})
    }
};

const searchRecipe = async (req, res) => {
    try {

        res.status(200).json({ message: 'Success' });
    } catch (error) {
        res.status(500).send({ message: error.message || 'Error occured'})
    }
};

// async function insertDummyCategoryData() {
//     try {   
//         await Category.insertMany([
//                 {
//                 name: 'Travel',
//                 iconUrl: '/public/static/icons/categories/travel.svg'
//             },
//             {
//                 name: 'Backpacking',
//                 iconUrl: '/public/static/icons/categories/backpacking.svg'
//             },
//             {
//                 name: 'Camping',
//                 iconUrl: '/public/static/icons/categories/camping.svg'
//             },
//             {
//                 name: 'Vegetarian',
//                 iconUrl: '/public/static/icons/categories/vegetarian.svg'
//             },
//              {
//                     name: 'Vegan',
//                     iconUrl: '/public/static/icons/categories/vegan.svg'
//                 },
//             {
//                 name: 'Gluten-Free',
//                 iconUrl: '/public/static/icons/categories/gluten-free.svg'
//             },
//             {
//                 name: 'Sugar-Free',
//                 iconUrl: '/public/static/icons/categories/sugar-free.svg'
//             },
//             {
//                 name: 'Dairy-Free',
//                 iconUrl: '/public/static/icons/categories/dairy-free.svg'
//             },
// {
//                     name: 'Dessert',
//                     iconUrl: '/public/static/icons/categories/desserts.svg'
//                 },
//                 {
//                     name: 'Breakfast',
//                     iconUrl: '/public/static/icons/categories/breakfast.svg'
//                 },
//                 {
//                     name: 'Dinner',
//                     iconUrl: '/public/static/icons/categories/dinner.svg'
//                 },
//             {
//                 name: 'Lunch',
//                 iconUrl: '/public/static/icons/categories/lunch.svg'
//             },
//             {
//                 name: 'Drink',
//                 iconUrl: '/public/static/icons/categories/drink.svg'
//             },
//             {
//                 name: 'Appetizer',
//                 iconUrl: '/public/static/icons/categories/appetizer.svg'
//             },
//             {
//                 name: 'Snack',
//                 iconUrl: '/public/static/icons/categories/snack.svg'
//             },
//             {
//                 name: 'Soups',
//                 iconUrl: '/public/static/icons/categories/soups.svg'
//             },
//             {
//                 name: 'Salads',
//                 iconUrl: '/public/static/icons/categories/salads.svg'
//             },
//             {
//                 name: 'Baking',
//                 iconUrl: '/public/static/icons/categories/baking.svg'
//             },
//             {
//                 name: 'Sauce',
//                 iconUrl: '/public/static/icons/categories/sauce.svg'
//             },
//             {
//                 name: 'Main Dish',
//                 iconUrl: '/public/static/icons/categories/main-dish.svg'
//             },
//         ])

//     } catch (err) {
//         console.log(err)
//     }
// }
// insertDummyCategoryData();

module.exports = {
    getAll,
    getById,
    getCuisines,
    getCategories,
    getByCategory,
    searchRecipe
}