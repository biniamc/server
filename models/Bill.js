/* eslint-disable */
const mongoose = require('mongoose');

//create bill schema
const Schema = mongoose.Schema;
const BillSchema = new Schema({
 date: Number,
 service_charge: Number,
 payment_date: Number
},{collection: "bill"});
const Bill= mongoose.model('Bill', BillSchema)
module.exports = Bill;