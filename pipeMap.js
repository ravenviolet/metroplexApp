const  { Job, Technician } = require('./models/model');

module.exports = { mapDeal, mapTechnician };

function mapDeal(pipedriveDeal) {
  // Map Pipedrive deal fields to Mongoose Job model fields here
  const mappedDeal = {
    deal_id: pipedriveDeal.id,
    id: pipedriveDeal.id,
    person_id: pipedriveDeal.personId
    // name: pipedrivePerson.name
    // Add other job fields here
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
