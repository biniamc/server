/* eslint-disable */
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const CustomerSchema = new Schema({
 first_name: String,
 last_name: String,
 email: String,
 phone_no: Number,
 address: String,
 gender: String,
 user_name: String,
 password: String
},{collection: "customer"});
const Customer = mongoose.model('Customer', CustomerSchema)
module.exports = Customer;