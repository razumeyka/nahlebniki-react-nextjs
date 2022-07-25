const { Schema, model, Types } = require('mongoose');

const cuisineSchema = new Schema({
    name: {
        type: String,
        required: true
    }, 
    iconUrl: {
        type: String,
        required: true
    }, 
});

module.exports = model('Cuisine', cuisineSchema);