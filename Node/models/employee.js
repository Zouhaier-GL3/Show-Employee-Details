const mongoose = require('mongoose');
const Joi = require('joi');


const employee_schema = new mongoose.Schema({
    id: Number,
  firstName: {type :String, required : true},
  lastName: {type :String, required : true},
  emailId: {type :String, required : true},
  active: {type :Boolean, required : false},
});

const Employee = mongoose.model('Employee', employee_schema);

// employee validator
const employee_body_validator = {
    firstName : Joi.string().min(3).max(20).required(),
    lastName: Joi.string().min(3).max(20).required(),
    emailId: Joi.string().min(3).max(20).required(),
}

module.exports.Employee = Employee;
module.exports.employee_body_validator = employee_body_validator;