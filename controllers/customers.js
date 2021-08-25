const Customer = require('../models/Customer.js');
const auth = require('../Extra/auth.js');
const response = require('../Extra/Response.js');
//const router = express.Router();
module.exports.controller = function (app) {
    // get all users
    app.get('/customers', (req, res) => {

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

            Customer.find({}, 'first_name last_name email phone_no address gender user_name password ', function (error, customers) {
                if (error) {
                    res.json(response.error(error.message));
                }
                res.json(response.prepare(customers));
            })

        } catch (err) {
            response.error(err.message)
        }

    });

    //get a single user details
    app.get('/customer/:id', (req, res) => {

        try {

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

            Customer.findById(req.params.id, 'first_name last_name email phone_no address gender user_name password', function (error, customer) {
                if (error) {
                    res.json(response.error(error.message));
                }
                res.json(response.prepare(customer));
            })

        } catch (err) {
            res.json(response.error(err.message));
        }

    });

    // add a new user
    app.post('/customers', (req, res) => {

        try {

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

            const newCustomer = new Customer({
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email,
                phone_no: req.body.phone_no,
                address: req.body.address,
                gender: req.body.gender,
                user_name: req.body.user_name,
                password: req.body.password
            });
            newCustomer.save((error, customer) => {
                if (error) {
                    res.json(response.error("error occurred!"));
                }
                res.json(response.prepare(customer));
            });

        } catch (err) {
            res.json(response.error(err.message));
        }

    });

    // update a user
    app.put('/customer/:token/:id', (req, res) => {

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

            Customer.findById(req.params.id, 'first_name last_name email phone_no address gender user_name password ', function (error, customer) {
                if (error) {
                    res.json(response.error(error.message));
                }
                customer.first_name = req.body.first_name
                customer.last_name = req.body.last_name
                customer.email = req.body.email
                customer.phone_no = req.body.phone_no
                customer.address = req.body.address
                customer.gender = req.body.gender
                customer.user_name = req.body.user_name
                customer.password = req.body.password

                customer.save(function (error2, customer) {
                    if (error2) {
                        console.log(error2);
                        res.json(response.error("error occurred!"));
                    }
                    res.json(response.prepare(customer));
                });
            })

        } catch (err) {
            res.json(response.error(err.message));
        }

    });

    // delete a user
    app.delete('/customer/:id', (req, res) => {

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

            Customer.remove({
                _id: req.params.id
            }, (error3) => {
                if (error3) {
                    res.json(response.error("error occurred!"));
                }
                res.json(response.prepare({success: true}));
            });

        } catch (err) {
            res.json(response.error(err.message));
        }

    });

};

