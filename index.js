require('dotenv').config();
const mongoose = require('mongoose');
const mongoString = process.env.DATABASE_URL;

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) =>{
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected Success');
})

const express = require('express');
const app = express();
app.use(express.json());

const routes = require('./routes/routes');
app.use('/api', routes);

app.listen(process.env.port || 3000, () => {
    console.log('Listening for requests')
})