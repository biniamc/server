/* eslint-disable */
const Report = require('../models/Report.js');
//const router = express.Router();
module.exports.controller = function (app)  {
 // get all users
 app.get('/reports', (req, res) => {
  Report.find({}, 'department_name date description', function (error, reports) {
  if (error) { console.log(error); }
  res.send(reports);
  })
})
//get a single user details
app.get('/report/:id', (req, res) => {
  Report.findById(req.params.id, 'department_name date description', function (error, report) {
  if (error) { console.log(error); }
  res.send(report)
 })
})
 
     
 // add a new user
    app.post('/reports', (req, res) => {
      const newReport = new Report({
      department_name: req.body.department_name,
      date: req.body.date,
      description: req.body.description
    });
        newReport.save((error, report) => {
        if (error) { console.log(error); }
        res.send(report);
        });
    });

    // update a user
  app.put('/report/:id', (req, res) => {
    Report.findById(req.params.id, 'department_name date  description', function (error, report) {
    if (error) { console.error(error); }
      report.department_name = req.body.department_name
      report.date = req.body.date
      report.description= req.body.description
       report.save(function (error, user) {
    if (error) { console.log(error); }
       res.send(report)
    })
  })
})

// delete a user
app.delete('/report/:id', (req, res) => {
  Report.remove({
    _id: req.params.id
    }, function(error){
   if (error) { console.error(error); }
      res.send({ success: true })
   })
})

  };

