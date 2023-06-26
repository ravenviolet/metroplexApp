const { Job } = require('./model');
const mongoose = require('mongoose');

// const dealsCollection = db.collection('jobs');
// const allDeals = Job.find();
// console.log(allDeals);

async function dupDeals(db) {

  const allDeals = await Job.find();
  console.log(allDeals);

  async function dupDeals() {
    const allDeals = await Job.find();
  }

}
// }

module.exports = dupDeals;

// const { Job } = require('./model');
// const mongoose = require('mongoose');

// // const dealsCollection = db.collection('jobs');
// // const allDeals = Job.find();
// // console.log(allDeals);

// async function dupDeals(db) {
//   // Get the deals collection from the database
//   // const dealsCollection = db.collection('jobs');

//   // Fetch all the deals from the Job model using .find() method
//   const allDeals = await Job.find();
//   // console.log(allDeals);

//   try {
//     if allDeals === null
//   }
//   // Use .reduce() method to deduplicate deals
//   const dupDeals = allDeals.reduce((acc, deal) => {
//     // Find a deal in the accumulator (acc) array with the same deal_id as the current deal
//     const existingDeal = acc.find((d) => d.deal_id === deal.deal_id);

//     // If there is no existing deal with the same deal_id or the existing deal's timestamp is greater than the current deal's timestamp
//     if (!existingDeal || existingDeal.timestamp > deal.timestamp) {
//       // Remove any deals with the same deal_id from the accumulator (acc) array
//       acc = acc.filter((d) => d.deal_id !== deal.deal_id);
//       // Add the current deal to the accumulator (acc) array
//       acc.push(deal);
//     }
//     // Return the updated accumulator (acc) array
//     return acc;
//   }, []);

//   await Job.deleteMany({});

//   // Print each deal in dupDeals array
//   for (const job of dupDeals) {
//     console.log(job);
//   }

//   // Save each deal in dupDeals array to the Job model
//   for (const job of dupDeals) {
//     const newDeal = new Job(job);
//     await newDeal.save();
//   }

//   console.log('Deals updated successfully');
// }

// module.exports = dupDeals;

// async function dupDeals(db){
//   const dealsCollection = db.collection('deals');
// // console.log('here');
//   const allDeals = await Job.find();

//   const dupDeals = allDeals.reduce((acc, deal) => {
//     const existingDeal = acc.find((d) => d.deal_id === deal.deal_id);
//     // console.log(existingDeal);
//     if (!existingDeal || existingDeal.timestamp > deal.timestamp) {
//         acc = acc.filter((d) => d.deal_id !== deal.deal_id);
//         acc.push(deal);
//     }
//     return acc;
//   }, []);

//   // console.log(acc);
//   // await Job.deleteMany({});

//   for (const job of dupDeals) {
//     console.log(job);
//   }

//   for (const job of dupDeals) {
//     const newDeal = new Job(job);
//     await newDeal.save();
//   }

//   console.log('Deals updated successfully');
// }

// module.exports = dupDeals;
