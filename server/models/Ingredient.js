const { Schema, model, Types } = require('mongoose');

const ingredientSchema = new Schema({
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
});

module.exports = model('Ingredient', ingredientSchema);