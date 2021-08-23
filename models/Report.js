/* eslint-disable */
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ReportSchema = new Schema({
 department_name: String,
 date: Number,
 description: String
}, {collection: "report"});
const Report = mongoose.model('Report', ReportSchema);
module.exports = Report;
