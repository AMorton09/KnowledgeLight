
const express = require('express');
const bodyParser = require('body-parser')
const hbs = require('express-handlebars');
const app     = express();

app.engine('handlebars', hbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.listen('8080');
app.disable("x-powered-by");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('views/public'));

console.log("hello its me i think im self aware");
console.log("I Believe to be running on port 8080");

app.get('/', (req, res) => {



        res.render('home')

});