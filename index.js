//import contents of .env into index.js.
require('dotenv').config();
const mongoose = require('mongoose');
//store string into variable called mongoString
const mongoString = process.env.DATABASE_URL;
//code to connect the database to the server using Mongoose
// let db;
// (async function() {
//   try {
//     await mongoose.connect('mongodb://localhost:27017/mydb', { useNewUrlParser: true, useUnifiedTopology: true });
//     db = mongoose.connection;
//     console.log('Connected to database successfully!');
//   } catch (error) {
//     console.error(error);
//   }
// })();

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) =>{
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected Success');
})
// end database code

const express = require('express');
const app = express();
app.use(express.json());

const routes = require('./routes/routes');
app.use('/api', routes);

app.listen(process.env.port || 3000, () => {
    console.log('Listening for requests')
})