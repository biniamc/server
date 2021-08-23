const mongoose = require('mongoose');
//create complaint schema
const Schema = mongoose.Schema;
const ComplaintSchema = new Schema({
 user_name: String,
 address: String,
 phone_no: Number,
 date: String,
 description: String,
 type:{
     type: String,
     default:null,
    },

},{collection: "complaint"});
const Complaint = mongoose.model('Complaint', ComplaintSchema)
module.exports = Complaint;
