const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  deal_id: {
    type: Number,
    required: true
  },
  creator_user_id: {
    id: String,
    name: String,
    email: String,
    active_flag: Boolean,
    value: Number
  },
  user_id: {
    id: String,
    name: String,
    email: String,
    active_flag: Boolean,
    value: Number
  },
  person_id: String,
  org_id: {
    name: String,
    people_count: Number,
    owner_id: Number,
    address: String,
    active_flag: Boolean,
    cc_email: String,
    value: Number
  },
  stage_id: Number,
  title: String,
  value: Number,
  currency: String,
  add_time: Date,
  update_time: Date,
  stage_change_time: String,
  active: Boolean,
  deleted: Boolean,
  status: String,
  probability: Number,
  next_activity_date: Date,
  next_activity_time: Date,
  next_activity_id: Number,
  last_activity_id: Number,
  last_activity_date: Date,
  lost_reason: String,
  visible_to: Number,
  close_time: Date,
  pipeline_id: Number,
  won_time: Date,
  first_won_time: Date,
  lost_time: Date,
  products_count: Number,
  files_count: Number,
  notes_count: Number,
  followers_count: Number,
  email_messages_count: Number,
  activities_count: Number,
  done_activities_count: Number,
  undone_activities_count: Number,
  participants_count: Number,
  expected_close_date: Date,
  last_incoming_mail_time: Date,
  last_outgoing_mail_time: Date,
  //label*
  label: String,
  stage_order_nr: Number,
  person_name: String,
  org_name: String,
  next_activity_subject: String,
  next_activity_type: String,
  next_activity_duration: String,
  next_activity_note: String,
  formatted_value: String,
  weighted_value: Number,
  formatted_weighted_value: String,
  weighted_value_currency: String,
  rotten_time: String,
  owner_name: String,
  cc_email: String,
  org_hidden: Boolean,
  person_hidden: Boolean,
  pipeline: String,
  deal_notes: String,
  //start of numerical objects in pipeMap
  city_name: String,
  state_name: String,
  community_name: String,
  // technician_name: String,
  technician_fields: {
    active_flag: Boolean,
    name: String,
    email: {
      // DealPersonDataEmail: {
        value: String,
        primary: Boolean,
      
    },
    phone: {
        value: Number,
        primary: Boolean,
    },
    owner_id: Number,
    value: Number,
},
  timezone_id: String,
  event_date: String,
  event_start_time: String,
  tech_notes: String,
  tech_payout: Number,
  tech_travel: Number,
  tech_payout_date: Date,
  event_status: Number,
  calendar_actions: String,
  assets: String,
  dropbox_deliverable: String,
  threed_tour_url: String,
  matterport_archive_date: Date,
  camera_type: String,
  photo_editing: String,
  advanced_photo_edit: String,
  accounts: String,
  invoice_number: Number,
  invoice_date: Date,
  invoice_url: String,
  part_paid: Number,
  other_payout: Number,
  other_payout_note: String,
  do_not_edit: String,
  prev_assigned_tech: String
},
  {
    timestamps: true
  });

//technician schema for mongodb
const technicianSchema = new mongoose.Schema({
  passwordExists: Boolean,
  passwordVal: String,
  active_flag: Boolean,
  name: String,
  email: {
      value: String,
      primary: Boolean,
  },
  phone: {
      value: Number,
      primary: Boolean,
  },
  owner_id: Number,
  value: Number,
},
{
  timestamps: true
});

const userSchema = new mongoose.Schema({
  passwordExists: Boolean,
  passwordVal: String,
  adminFlag: Boolean,
  name: String,
  email: {
      value: String,
      primary: Boolean,
  },
  phone: {
      value: Number,
      primary: Boolean,
  },
},
{
  timestamps: true
});

const User = mongoose.model('User', userSchema);
const Job = mongoose.model('Job', jobSchema);
const Technician = mongoose.model('Technician', technicianSchema);

module.exports = { User, Job, Technician };
