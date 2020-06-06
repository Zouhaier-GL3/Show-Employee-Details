const express = require('express');
const Joi = require('joi');
const router = express.Router();
const { Students, student_body_validator } = require('../models/student')
//get All student
router.get("/list",async (req,res)=>{
    var students = await Students.find(); // select * from Student
    res.send(students);
});

//post new student
router.post("/add",async (req,res)=>{ 
    console.log(req.body)
    var res_validation = Joi.validate(req.body,student_body_validator);
    if(res_validation.error)
        return res.status(400).send('Error :' + res_validation.error.details[0].messphone);
    var students = new Students({
        name: req.body.name,
        phone: req.body.phone,
        message : req.body.message   
    });
    let savedStudent = await students.save();
    res.send(savedStudent);
});

//update student by Id
router.put('/update/id/:id', async (req, res) => {
    var valid_id = Joi.validate(req.params, id_validator);
    if (valid_id.error)
        return res.status(400).send(valid_id.error.details[0].messphone);
    var res_validation = Joi.validate(req.body, student_body_validator_update);
    if (res_validation.error)
        return res.status(400).send('Error :' + res_validation.error.details[0].messphone);
    var students = {
        name: req.body.name,
        phone: req.body.phone,
        message : req.body.message
    };

    var old_student = await Student.findById(req.params.id); // select * from Student
    students = _.merge(old_student,students);
    old_student = await student.findByIdAndUpdate(req.params.id, students); // select * from Student
    if (!old_student)
        return res.status(404).send('Student with this Id is missing');
    res.send(old_student);
});


//delete student by Id
router.delete('/remove/:id', (req, res, next) => {

    //TODO: Validate if the the task belongs to the person deleting it (check owner)
  
    const studentID = req.params.id;
    Students.remove({ _id: studentID }, (err) => {
        if(err) {
          return res.send({
            success: false,
            message: 'Failed to delete the task'
          });
        }
  
        return res.send({
          success: true,
          message: 'Task deleted'
        });
    });
  });
  
module.exports = router;