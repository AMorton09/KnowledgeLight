const express = require('express');
const bodyParser = require('body-parser')
const hbs = require('express-handlebars');
const app = express();
const dbConfig = require('./mongo/dbConfig.js');
const mongoose = require('mongoose');
const Class = require('./mongo/models/ClassModel')

app.engine('handlebars', hbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.listen(process.env.PORT || 3000);

app.disable("x-powered-by");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/public', express.static(__dirname + "/views/public"));
mongoose.connect(dbConfig.url);

console.log("hello its me i think im self aware");
console.log("I Believe to be running on port 3000");


app.get('/', (req, res) => {
    Class.find((err, classes) => {
        if (err) console.log(err);
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
        if (err) console.log(err);
        console.log(classObj);
        res.render('redlight', {classObj: classObj})



    });

});



app.post("/getData",(req,res) =>{

    Class.findById(req.body.classID, function (err, classObj) {
        if (err) console.log(err);
        console.log(classObj);
        res.render('dataView', {classObj: classObj})



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
        if (err) console.log(err);

        console.log('Class saved successfully!');
    });
    res.redirect('/');
});

app.post("/addRed", (req, res) => {

    console.log(req.body.classID);

    Class.findById(req.body.classID, function (err, classObj) {
        if (err) console.log(err);

        let light = classObj.red + 1;





    Class.update({ _id: classObj._id }, { red: light }, { multi: false },  (err, mongoResponse) => {
        if (err) console.log(err);
        console.log('The raw response from Mongo was ', mongoResponse);
    });
        res.render('redlight', {classObj: classObj})
    });


});

app.post("/addYellow", (req, res) => {
    console.log(req.body.classID);

    Class.findById(req.body.classID, function (err, classObj) {
        if (err) console.log(err);

        let light = classObj.yellow + 1;





        Class.update({ _id: classObj._id }, { yellow: light }, { multi: false },  (err, mongoResponse) => {
            if (err)console.log(err);
            console.log('The raw response from Mongo was ', mongoResponse);
        });
        res.render('redlight', {classObj: classObj})
    });
});

app.post("/addGreen", (req, res) => {
    console.log(req.body.classID);

    Class.findById(req.body.classID, function (err, classObj) {
        if (err) console.log(err);

        let light = classObj.green + 1;





        Class.update({ _id: classObj._id }, { green: light }, { multi: false },  (err, mongoResponse) => {
            if (err) console.log(err);
            console.log('The raw response from Mongo was ', mongoResponse);
        });
        res.render('redlight', {classObj: classObj})
    });
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