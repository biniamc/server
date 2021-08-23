const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const fs = require('fs');
const router = express.Router();
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());
//connect to mongodb
// const MongooseCollection = require('../../mongoosecollection');
mongoose.connect('mongodb://127.0.0.1:27017/CSCMS', function() {
 console.log('Connection has been made');
})
.catch(err => {
 console.error('App starting error:', err.stack);
 process.exit(1);
});

// Include controllers
fs.readdirSync("controllers").forEach(function (file) {
    if(file.substr(-3) == ".js") {
      const route = require("./controllers/" + file);
         route.controller(app);
    };
   });
   // catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
   });
   // error handler
   app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render('error');
   });
   module.exports = app;
router.get('/', function(req, res) {
 res.json({ message: 'API Initialized!'});
});
const port = process.env.API_PORT || 3000;
app.use('/', router);
app.listen(port, function() {
 console.log(`api running on port ${port}`);
});
