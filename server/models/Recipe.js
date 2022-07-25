const { Schema, model, Types } = require('mongoose');

const recipeSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: false
    },
    authorCountry: {
        type: String,
        required: false
    },
    originCountry: {
        type: String,
        required: false
    },
    imageUrl: {
        type: String,
        required: true
    },
    backstageImagesUrl: [
        {
            type: String,
            required: false
        }
    ],
    description: {
        type: String,
        required: true
    },
    categories: [
        {
            type: String,
            required: false
        }
    ],
    serving: {
        type: String,
        required: true
    },
    isIngredientsGrouped: {
        type: Boolean,
        required: true,
        default: false
    },
    ingredients: [{
        title: {
            type: String,
            required: true
        }, 
        quantity: {
            type: Number,
            required: true
        },
        unit: {
            type: String,
            required: true
        },
        group: {
            type: String,
            required: false
        }
    }],
    steps: [
        { 
            stepNumber: {
                type: String,
                required: true
            },
            description: {
                type: String,
                required: true
            }, 
            imageUrl: String 
        }
    ]
});

module.exports = model('Recipe', recipeSchema);