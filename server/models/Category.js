const { Schema, model, Types } = require('mongoose');

const categorySchema = new Schema({
    name: {
        type: String,
        required: true
    }, 
    iconUrl: {
        type: String,
        required: true
    }, 
});

module.exports = model('Category', categorySchema);