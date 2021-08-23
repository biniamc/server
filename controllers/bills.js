/* eslint-disable */
const Bill = require('../models/Bill.js');
//const router = express.Router();
module.exports.controller = function (app)  {
 // get all users
 app.get('/bills', (req, res) => {
  Bill.find({}, 'date service_charge payment_date', function (error, bills) {
  if (error) { console.log(error); }
  res.send(bills);
  })
})
//get a single user details
app.get('/bill/:id', (req, res) => {
  Bill.findById(req.params.id, 'date service_charge payment_date', function (error, bill) {
  if (error) { console.log(error); }
  res.send(bill)
 })
})
 
     
 // add a new user
    app.post('/bills', (req, res) => {
      const newBill = new Bill({
      date: req.body.date,
      service_charge: req.body.service_charge,
      payment_date: req.body.payment_date
    });
        newBill.save((error, bill) => {
        if (error) { console.log(error); }
        res.send(bill);
        });
    });

    // update a user
  app.put('/bill/:id', (req, res) => {
    Bill.findById(req.params.id, 'date service_charge payment_date', function (error, bill) {
    if (error) { console.error(error); }
      bill.date= req.body.date
      bill.service_charge= req.body.service_charge
      bill.payment_date = req.body.payment_date
       bill.save(function (error, bill) {
    if (error) { console.log(error); }
       res.send(bill)
    })
  })
})

// delete a user
app.delete('/bill/:id', (req, res) => {
  Bill.remove({
    _id: req.params.id
    }, function(error){
   if (error) { console.error(error); }
      res.send({ success: true })
   })
})

  };

