const  { Job, Technician } = require('./models/model');

module.exports = { mapDeal, mapTechnician };

function mapDeal(pipedriveDeal) {
  // Map Pipedrive deal fields to Mongoose Job model fields here
  const mappedDeal = {
    deal_id: pipedriveDeal.id,
    title: pipedriveDeal.title,
    pipeline: pipedriveDeal.pipeline,
    deal_notes: pipedriveDeal['87bccaa66e94e9fb339a2adc343333fa900fbe27'] ?? '',
    stage_id: pipedriveDeal.stage_id,
    city_name: pipedriveDeal['77b85cff28201abfec9f626c357ceec59e075636_locality'] ?? '',
    state_name: pipedriveDeal['77b85cff28201abfec9f626c357ceec59e075636_admin_area_level_1'] ?? '',
    community_name: pipedriveDeal['bb04ca63627f17ecb02aac6a7260876c6492079f'] ?? '',
    technician_name: pipedriveDeal['0c83313fba78b12676463126f74527552763ec8e']?.name ?? 'Default Name',
    timezone_id: pipedriveDeal['52e0c2cd1fbf5b9b56a79450b79a3e8757bb5b1f_timezone_i'] ?? '',
    event_date: pipedriveDeal['a5ed135fe1d0c912d151685da4f86620106e074f'] ?? '',
    event_start_time: pipedriveDeal['52e0c2cd1fbf5b9b56a79450b79a3e8757bb5b1f'] ?? ''
  };

  return new Job(mappedDeal);
}

function mapTechnician(pipedrivePerson) {
  // Map Pipedrive person fields to Mongoose Technician model fields here
  const mappedTechnician = {
    id: pipedrivePerson.id,
    name: pipedrivePerson.name
    // Add other technician fields here if any
  };

  return new Technician(mappedTechnician);
}
// const  Model  = require('./models/model');

// module.exports = { mapDeal };
// function mapDeal(pipedriveDeal) {
//   const mappedDeal = {
//     deal_id: pipedriveDeal.id,
//     id: pipedriveDeal.id
//   };

//   return new Model({
//     deal_id: pipedriveDeal.id,
//     id: pipedriveDeal.id
//   });
// }

// module.exports = mapDeal;

// module.exports = { technicians };
// function technicians(pipedriveDeal) {
//   const mappedDeal = {
//     deal_id: pipedriveDeal.id,
//     id: pipedriveDeal.id
//   };

//   return new Model({
//     deal_id: pipedriveDeal.id,
//     id: pipedriveDeal.id
//   });
// }

// module.exports = mapDeal;
