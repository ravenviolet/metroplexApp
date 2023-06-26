require('dotenv').config();
const mongoose = require('mongoose');
const mongoString = process.env.DATABASE_URL;
const dupDeals = require('./models/model_update')

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) =>{
    console.log(error)
})

database.once('connected', () =>{
    console.log('Database Connected Success')
})

const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended:true }));

const routes = require('./routes/routes');
const dealUpdateRoute = require('./routes/dealupdate');

app.use('/api', routes);
app.use('/api/dealupdate', dealUpdateRoute);

app.listen(process.env.PORT || 3000, () => {
    console.log('Listening for requests');
  });