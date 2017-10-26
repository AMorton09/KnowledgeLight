const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
    className : String,
    red : String,
    yellow: String,
    green: String
});


let Class = mongoose.model('Class', classSchema);

module.exports = Class;