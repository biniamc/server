/* eslint-disable */
const express = require('express');
const bodyParser = require('body-parser');
const Emergency = require('../models/Emergency_report.js');
//const router = express.Router();
module.exports.controller = function (app)  {
 // get all users
 app.get('/emergencys', (req, res) => {
  Emergency.find({}, 'Fname Lname phone_no location case description', function (error, emergency) {
  if (error) { console.log(error); }
  res.send(emergency);
  })
})

//get a single user details
app.get('/emergency/:id', (req, res) => {
  Emergency.findById(req.params.id, 'Fname Lname phone_no location case description', function (error, emergency) {
  if (error) { console.log(error); }
  res.send(emergency)
 })
})
 
     
 // add a new user
    app.post('/emergencys', (req, res) => {
      const newEmergency = new Emergency({
      Fname: req.body.Fname,
      Lname: req.body.Lname,
      phone_no: req.body.phone_no,
      location: req.body.location,
      select: req.body.select,
      description: req.body.description
    });
        newEmergency.save((error, emergency) => {
        if (error) { console.log(error); }
        res.send(emergency);
        });
    });

     // update a user
  app.put('/emergency/:id', (req, res) => {
    Emergency.findById(req.params.id, 'Fname Lname phone_no location case description', function (error, emergency) {
    if (error) { console.error(error); }
      emergency.Fname = req.body.Fname
      emergency.Lname = req.body.Lname
      emergency.phone_no = req.body.phone_no
      emergency.location = req.body.location
      emergency.select = req.body.select
      emrgency.description= req.body.description
       emrgency.save(function (error, user) {
    if (error) { console.log(error); }
       res.send(emergency)
    })
  })
})

// delete a user
app.delete('/emergency/:id', (req, res) => {
  User.remove({
    _id: req.params.id
    }, function(error){
   if (error) { console.error(error); }
      res.send({ success: true })
   })
})

  };

