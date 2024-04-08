var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Set up mongoose connection
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const mongoDB = "mongodb+srv://nguyen0811:Tringuyen0811@customer.il1dwll.mongodb.net/?retryWrites=true&w=majority&appName=Customer";
main().catch((err) => console.log(err));
async function main() {
await mongoose.connect(mongoDB);
}

app.listen(process.env.port || 3000);
console.log("Running at: http://localhost:3000/");