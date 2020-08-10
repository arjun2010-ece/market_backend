const express = require("express");
const app = express();


const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");


//dotenv
require('dotenv').config()
const port = process.env.port || 8002;


const signup = require("./routes/auth");



//db connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true    
}).then(() => console.log('DB Connected'))

mongoose.connection.on('error', err => {
    console.log(`DB connection error: ${err.message}`)
});



//middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());



//routes
app.use("/api", signup);

//for token expiration custom message
// put before routes.
app.use(function(err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        return res.status(401).json({ error: 'Oops! Token expired.' });
    }
});

app.listen(port,function() {
    console.log("Server connected on port ", port);
});