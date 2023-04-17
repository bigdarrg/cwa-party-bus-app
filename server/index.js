//Loading modules
const express = require('express');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');

//Having our environment variable in the .env file
require('dotenv').config();

//Creating the express server
const server = express();
const port = process.env.PORT || 5000;

//Adding middleware
server.use(cors());
server.use(express.json());

//Runs build placed in build dir
server.use(express.static(path.join(__dirname + "/build")));

//Opening connection to the database
async function connectToDB() {
    //Connecting to uri where our database is stored
    const uri = process.env.MONGODB_URI;
    mongoose.connect(uri, {});

    const connection = await mongoose.connection; 

    connection.once('open', () => { //once connection is open
        console.log("MongoDB database connection established successfully");
    }); 
}

connectToDB();

//Inititalising HTTPS reqs 
const bookingsRouter = require('./requests/booking-https');
server.use('/bookings', bookingsRouter);

const emailsRouter = require('./requests/email-https');
server.use('/emails', emailsRouter);

const mapsRouter = require('./requests/maps-https');
server.use('/maps', mapsRouter);

//Starting the server
server.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});