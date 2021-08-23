/* eslint-disable */
const express = require('express');
const bodyParser = require('body-parser');
const Warning = require('../models/Warning.js');
//const router = express.Router();
module.exports.controller = function (app)  {
 // get all users
 app.get('/warnings', (req, res) => {
  Warning.find({}, 'emp_id date description caseWorker', function (error, warning) {
  if (error) { console.log(error); }
  res.send(warning);
  })
})
//get a single user details
app.get('/warning/:id', (req, res) => {
  Warning.findById(req.params.id, 'emp_id date description caseWorker', function (error, warning) {
  if (error) { console.log(error); }
  res.send(warning)
 })
})
 
     
 // add a new user
  app.post('/warnings', (req, res) => {
     const newWarning = new Warning({
      emp_id: req.body.emp_id, 
      date: req.body.date,
      description: req.body.description,
      caseWorker: req.body.caseWorker
    });
        newWarning.save((error, warning) => {
        if (error) { console.log(error); }
        res.send(warning);
        });
    });

     // update a user
  app.put('/warning/:id', (req, res) => {
    Warning.findById(req.params.id, 'emp_id date description', function (error, warning) {
    if (error) { console.error(error); }
      warning.emp_id=req.body.emp_id
      warning.date = req.body.date
      warning.description = req.body.description
      warning.caseWorker= req.body.caseWorker
       warning.save(function (error, warning) {
    if (error) { console.log(error); }
       res.send(warning)
    })
  })
})

// delete a user
app.delete('/warning/:id', (req, res) => {
  Warning.remove({
    _id: req.params.id
    }, function(error){
   if (error) { console.error(error); }
      res.send({ success: true })
   })
})

  };

