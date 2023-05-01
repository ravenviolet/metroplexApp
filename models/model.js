const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  deal_id: {
    type: String,
    required: true
  },
  id: {
    type: String,
    required: true
  },
  person_id: {
    type: Number,
    required: false
  }
  // name: {
  //   type: String,
  //   required: false
  // }
});

//technician schema for mongodb
const technicianSchema = new mongoose.Schema({
  name: String,
  id: Number
});

const Job = mongoose.model('Job', jobSchema);
const Technician = mongoose.model('Technician', technicianSchema);

module.exports = { Job, Technician };
// const Technician = mongoose.model('Technician', technicianSchema);

// const Model = mongoose.model('Model', jobSchema, technicianSchema);

// module.exports = Model;
