const mongoose = require('mongoose');
const Joi = require('joi');


const student_schema = new mongoose.Schema({
    name : {type :String, required : true},
    phone: Number,
    message : {type :String, required : true},
    
});

const Students = mongoose.model('Students', student_schema);

// student validator
const student_body_validator = {
    name : Joi.string().min(1).max(30).required(),
    phone: Joi.number().positive(),
    message : Joi.string().min(1).max(30).required()
}

module.exports.Students = Students;
module.exports.student_body_validator = student_body_validator;