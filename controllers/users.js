/* eslint-disable */
const User = require('../models/User.js');
//const router = express.Router();
module.exports.controller = function (app)  {
 // get all users
 app.get('/users', (req, res) => {
  User.find({}, 'username password', function (error, users) {
  if (error) { console.log(error); }
  res.send(users);
  })
})
//get a single user details
app.get('/user/:id', (req, res) => {
  User.findById(req.params.id, 'username password', function (error, user) {
  if (error) { console.log(error); }
  res.send(user)
 })
})
 
     
 // add a new user
    app.post('/users', (req, res) => {
      const newUser = new User({
      username: req.body.username,
      password: req.body.password
    });
        newUser.save((error, user) => {
        if (error) { console.log(error); }
        res.send(user);
        });
    });

    // update a user
  app.put('/user/:id', (req, res) => {
    User.findById(req.params.id, 'username password', function (error, user) {
    if (error) { console.error(error); }
      user.username = req.body.username
      user.password = req.body.password
       user.save(function (error, user) {
    if (error) { console.log(error); }
       res.send(user)
    })
  })
})

// delete a user
app.delete('/user/:id', (req, res) => {
  User.remove({
    _id: req.params.id
    }, function(error){
   if (error) { console.error(error); }
      res.send({ success: true })
   })
})

  };

