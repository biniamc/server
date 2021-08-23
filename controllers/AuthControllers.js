
const Customers = require('../models/Customer');
const Employees = require('../models/Employee');
const my_response = require('../Extra/Response');
const auth = require('../Extra/auth');

module.exports.controller = function (app) {

    app.get('/customer_login/:phone_no/:password', (req, res) => {

        try{

            let result = {};

            Customers.findOne({
                phone_no: req.params.phone_no,
                password: req.params.password,
            }, function(err, result_data) {

                try{

                    if (!err) {
                        //console.log(result_data);
                        if(result_data){

                            let token = auth.getToken(15);
                            result.id = result_data._id;
                            result.phone_no = result_data.phone_no;
                            result.type = "customer"

                            auth.saveCredential(token, result);
                            result.token = token;
                            res.json(my_response.prepare(result));

                        }else{
                            res.json(my_response.error("Access Denied"));
                        }

                    } else {
                        res.json(my_response.error(err.message));
                    }
                    res.end();

                }catch(err1){
                    res.json(my_response.error(err1.message));
                    res.end();
                }

            });

        }catch(err){
            res.json(my_response.error(err.message));
            res.end();
        }

    });

    app.post('/employee_login', (req, res) => {

        try{

            let result = {};

            Employees.findOne({
                email: req.body.email,
                password: req.body.password
            }, function(err, result_data) {

                try{
                    if (!err) {
                        if(result_data){

                            let token = auth.getToken(15);
                            result.id = result_data._id;
                            result.department = result_data.department;
                            result.branch = result_data.branch;
                            result.type = "employee"

                            auth.saveCredential(token, result);
                            result.token = token;
                            res.json(my_response.prepare(result));

                        }else{
                            res.json(my_response.error("Access Denied"));
                        }

                    } else {
                        res.json(my_response.error(err.message));
                    }
                    res.end();
                }catch(err1){
                    res.json(my_response.error(err1.message));
                    res.end();
                }

            });

        }catch(err){
            res.json(my_response.error(err.message));
            res.end();
        }

    });

    app.post('/logout', (req, res) => {

        try{
            auth.deleteCredentials(req.body.token);
            res.json(my_response.prepare({}));
        }catch(err){
            res.json(my_response.error(err.message));
            res.end();
        }

    });

    app.get('/auth_info/:token', (req, res) => {

        try{
            let info = auth.getCredentials();
            if(info[req.params.token]){
                res.json(my_response.prepare(info[req.params.token]));
            }else{
                res.json(my_response.error("invalid token"));
            }
        }catch(err){
            res.json(my_response.error(err.message));
            res.end();
        }

    });

}

