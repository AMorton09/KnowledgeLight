const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
    className : String,
    red : Number,
    yellow: Number,
    green: Number
});


let Class = mongoose.model('Class', classSchema);

module.exports = Class;