/* eslint-disable */
const express = require('express');
const bodyParser = require('body-parser');
const Complaint = require('../models/Complaint.js');
const Notification = require('../models/notification.js');
const auth = require('../Extra/auth.js');
const response = require('../Extra/Response.js');

//const router = express.Router();
module.exports.controller = function (app) {

    // get all complaints
    app.get('/all_complaints/:token', (req, res) => {

        try {

            let user = auth.checkAuth(req.params.token);

            if (!user) {
                res.json(response.error("Access Denied!"));
            }

            if (!user.type) {
                res.json(response.error("Access Denied!"));
            }

            if (user.type != "employee" && user.department && user.department != "admin") {
                res.json(response.error("Access Denied!"));
            }

            Complaint.find({}, 'user_name address phone_no date description type subComplaint', function (error, users) {
                if (error) {
                    console.log(error);
                    res.json(response.error("error occurred!"));
                }
                res.json(response.prepare(users));
            });

        } catch (err) {
            res.json(response.error(err.message));
        }

    });

    //get a single complaints details
    app.get('/complaints/:token/:id', (req, res) => {

        try {

            let user = auth.checkAuth(req.params.token);

            if (!user) {
                res.json(response.error("Access Denied!"));
            }

            if (!user.type || user.type != "employee") {
                res.json(response.error("Access Denied!"));
            }

            if (user.department && user.department != "admin") {
                res.json(response.error("Access Denied!"));
            }

            Complaint.findById(req.params.id, 'user_name address phone_no date description type subComplaint', function (error, users) {
                if (error) {
                    console.log(error);
                    res.json(response.error("error occurred!"));
                }
                res.json(response.prepare(users))
            });

        } catch (err) {
            res.json(response.error(err.message));
        }

    });

    app.get('/complaints/:token', (req, res) => {

        try {

            let user = auth.checkAuth(req.params.token);

            if (!user) {
                res.json(response.error("Access Denied!"));
            }

            if (!user.type || user.type != "employee") {
                res.json(response.error("Access Denied!"));
            }

            // if (user.department && user.department != "admin"){
            //     res.json(response.error("Access Denied!"));
            // }

            Complaint.findById({type: user.department}, 'user_name address phone_no date description type subComplaint', function (error, users) {
                if (error) {
                    console.log(error);
                    res.json(response.error("error occurred!"));
                }
                res.json(response.prepare(users));
            });

        } catch (err) {
            res.json(response.error(err.message));
        }

    });

    // add a new user
    app.post('/complaints', (req, res) => {

        try {

            let user = auth.checkAuth(req.body.token);

            if (!user) {
                res.json(response.error("Access Denied!"));
            }

            if (!user.type || user.type != "customer") {
                res.json(response.error("Access Denied!"));
            }

            const newComplaint = new Complaint({
                user_name: req.body.user_name,
                address: req.body.address,
                phone_no: req.body.phone_no,
                date: req.body.date,
                description: req.body.description,
                type: req.body.type,
                subComplaint: req.body.subComplaint
            });
            newComplaint.save((error, complaint) => {
                if (error) {
                    console.log(error);
                    res.json(response.error("error occurred!"));
                }

                new Notification({
                    for: req.body.type,
                    complain_id: complaint._id
                }).save((error2, notify)=>{
                    if (error2) { throw error2; }
                    //res.json(response.error("error occurred!"));
                });

                res.json(response.prepare(complaint));
            });

        } catch (err) {
            res.json(response.error(err.message));
        }

    });

    // update a user
    app.put('/complaints/:token/:id', (req, res) => {

      try{

        let user = auth.checkAuth(req.params.token);

        if (!user) {
          res.json(response.error("Access Denied!"));
        }

        if (!user.type || user.type != "employee") {
          res.json(response.error("Access Denied!"));
        }

        if (user.department && user.department != "assistant") {
          res.json(response.error("Access Denied!"));
        }

        Complaint.findById(req.params.id, function (error, complaint) {

          if(error) {
            console.error(error);
            res.json(response.error("error occurred!"));
          }

          complaint.user_name = req.body.user_name
          complaint.address = req.body.address
          complaint.phone_no = req.body.phone_no
          complaint.date = req.body.date
          complaint.description = req.body.description
          complaint.type = req.body.type
          complaint.subComplaint = req.body.subComplaint

          complaint.save(function (error, complaints) {
            if (error) {
              console.log(error);
              res.json(response.error("error occurred!"));
            }
            res.json(response.prepare(complaints));
          })

        });

      }catch(err){
        res.json(response.error(err.message));
      }

    });

    // delete a user
    app.delete('/complaints/:token/:id', (req, res) => {

      try{

        let user = auth.checkAuth(req.params.token);

        if (!user) {
          res.json(response.error("Access Denied!"));
        }

        if (!user.type || user.type != "employee") {
          res.json(response.error("Access Denied!"));
        }

        if (user.department && user.department != "assistant") {
          res.json(response.error("Access Denied!"));
        }

        Complaint.remove({
          _id: req.params.id
        }, function (error) {
          if (error) {
            console.error(error);
            res.json(response.error("error occurred!"));
          }
          res.json(response.prepare({success: true}));
        });

      }catch(err){
        res.json(response.error(err.message));
      }

    });

};


