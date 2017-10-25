const express = require('express');
const bodyParser = require('body-parser')
const hbs = require('express-handlebars');
const app = express();
const dbConfig = require('./mongo/dbconfig');
const mongoose = require('mongoose');


app.engine('handlebars', hbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.listen('8080');
app.disable("x-powered-by");
app.use(bodyParser.urlencoded({extended: false}));
app.use('/public', express.static(__dirname + "/views/public"));
mongoose.connect(dbConfig.url);

console.log("hello its me i think im self aware");
console.log("I Believe to be running on port 8080");



app.get('/', (req, res) => {
    res.render('home')
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