const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
    period : int,
    red : int,
    yellow: int,
    green: int
});




module.exports = Class = mongoose.model('classSchema', schema);
