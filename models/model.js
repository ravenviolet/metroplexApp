const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  //deal_id and id are redundandt. pipeMap.js defines the actual API ID's for example: pipedriveDeal.id.
  deal_id: {
    type: String,
    required: true
  },
  title: String,
  pipeline: String,
  deal_notes: String,
  stage_id: String,
  city_name: String,
  state_name: String,
  formatted_address: String,
  community_name: String,
  technician_name: String,
  timezone_id: String,
  event_date: String,
  event_start_time: String
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
