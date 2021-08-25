/* eslint-disable */
const express = require('express');
const bodyParser = require('body-parser');
const Employee = require('../models/Employee.js');
const auth = require('../Extra/auth.js');
const response = require('../Extra/Response.js');

//const router = express.Router();
module.exports.controller = function (app) {

    // get all users
    app.get('/employees', (req, res) => {

        try{

            // let user = auth.checkAuth(req.params.token);
            
            // if (!user) {
            //     res.json(response.error("Access Denied!"));
            // }
            
            // if (!user.type || user.type != "employee") {
            //     res.json(response.error("Access Denied!"));
            // }
            
            // if (user.department && user.department != "admin") {
            //     res.json(response.error("Access Denied!"));
            // }

            Employee.find({}, 'emp_id first_name last_name email phone_no gender branch department user_name password', function (error, employees) {
                if (error) {
                    console.log(error);
                    res.json(response.error(error.message));
                }
                res.json(response.prepare(employees));
            });

        }catch(err){
            res.json(response.error(err.message));
        }

    });

    //get a single user details
    app.get('/employee/:token/:id', (req, res) => {

        try {

            // let user = auth.checkAuth(req.params.token);

            // if (!user) {
            //     res.json(response.error("Access Denied!"));
            // }

            // if (!user.type || user.type != "employee") {
            //     res.json(response.error("Access Denied!"));
            // }

            // if (user.department && user.department != "admin") {
            //     res.json(response.error("Access Denied!"));
            // }

            Employee.findById(req.params.id, 'emp_id first_name last_name email phone_no gender branch department user_name password', function (error, employee) {
                if (error) {
                    res.json(response.error(error.message));
                }
                res.json(response.prepare(employee));
            });

        } catch (err) {
            res.json(response.error(err.message));
        }

    });

    // add a new user
    app.post('/employees', (req, res) => {

        try{

            // let user = auth.checkAuth(req.body.token);
            
            // if (!user) {
            //     res.json(response.error("Access Denied!"));
            // }
            
            // if (!user.type || user.type != "employee") {
            //     res.json(response.error("Access Denied!"));
            // }
            
            // if (user.department && user.department != "admin") {
            //     res.json(response.error("Access Denied!"));
            // }

            const newEmployee = new Employee({
                emp_id: req.body.emp_id,
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email,
                phone_no: req.body.phone_no,
                gender: req.body.gender,
                branch: req.body.branch,
                department: req.body.department,
                user_name: req.body.user_name,
                password: req.body.password,
            });
            newEmployee.save((error, employee) => {
                if (error) {
                    console.log(error);
                    res.json(response.error("error occurred"));
                }
                res.json(response.prepare(employee));
            });

        }catch(err){
            res.json(response.error(err.message));
        }

    });

    // update a user
    app.put('/employee/:token/:id', (req, res) => {

        try{

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

            Employee.findById(req.params.id, 'emp_id first_name last_name email phone_no gender branch department user_name password', function (error, employee) {
                if (error) {
                    console.error(error);
                    res.json(response.error("error occurred!"));
                }
                employee.emp_id = req.body.emp_id
                employee.first_name = req.body.first_name
                employee.last_name = req.body.last_name
                employee.email = req.body.email
                employee.phone_no = req.body.phone_no
                employee.gender = req.body.gender
                employee.branch = req.body.branch
                employee.department = req.body.department
                employee.user_name = req.body.user_name
                employee.password = req.body.password

                employee.save(function (error, employee) {
                    if (error) {
                        console.log(error);
                        res.json(response.error("error occurred"));
                    }
                    res.json(response.prepare(employee));
                })
            });

        }catch(err){
            res.json(response.error(err.message));
        }

    });

    // delete a user
    app.delete('/employee/:token/:id', (req, res) => {

        try{

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

            Employee.remove({
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

