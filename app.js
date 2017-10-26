const express = require('express');
const bodyParser = require('body-parser')
const hbs = require('express-handlebars');
const app = express();
const dbConfig = require('./mongo/dbconfig');
const mongoose = require('mongoose');
const Class = require('./mongo/models/ClassModel')

app.engine('handlebars', hbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.set('port', process.env.app_port || 8080);
app.listen('8080');
app.disable("x-powered-by");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/public', express.static(__dirname + "/views/public"));
mongoose.connect(dbConfig.url);

console.log("hello its me i think im self aware");
console.log("I Believe to be running on port 8080");


app.get('/', (req, res) => {
    Class.find((err, classes) => {
        if (err) return console.error(err);
        console.log(classes);
        res.render('home', {Class: classes})
    })

});

app.get('/redLight', (req, res) => {
    res.render('redlight')
})

app.post('/selectClass', (req, res) => {
    console.log(req.body);
    console.log(req.body.classID);
    Class.findById(req.body.classID, function (err, classObj) {
        if(!err){
            console.log(classObj);
            res.render('redlight', {Class: classObj})
        }
        else{
            console.log(err);
        }

    });

});

app.post("/createClass", (req, res) => {
    console.log(req.body.className);
    let newClass = Class({
        className: req.body.className,
        red: 0,
        yellow: 0,
        green: 0
    });
    newClass.save((err) => {
        if (err) throw err;

        console.log('Class saved successfully!');
    });
    res.render('home');
});

app.post("/addRed", (req, res) => {

});

app.post("/addYellow", (req, res) => {

});

app.post("/addGreen", (req, res) => {

});


// error handler
app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});