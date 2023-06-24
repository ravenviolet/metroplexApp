const express = require('express');
const router = express.Router();
const { Job, Technician } = require('../models/model');
const pipedrive = require('pipedrive');
const { mapDeal, mapTechnician } = require('../pipeMap.js');
const defaultClient = new pipedrive.ApiClient();
// const cors = require('cors');

router.use(express.json());
// router.use(cors());
let apiToken = defaultClient.authentications.api_key;
apiToken.apiKey = 'adee9abc6e0b3449db978340e0fd9ea104923205';

//webhook
// router.post('/webhook', async (req, res) => {
//   try {
//     // Process the webhook payload here
//     console.log('Webhook received:', req.body);

//     const eventType = req.body.meta.action; // Get the event type from the webhook payload
//     console.log(eventType);
//     if (eventType === 'updated') { 
//       const updatedDeal = req.body.current; // Get the updated deal data from the webhook payload

//       // Process the updated deal data
//       console.log(`Deal updated. New data:`, updatedDeal);

//       const dealId = req.body.meta.id;

//       // Job.findById(dealId, function (err,doc) {
//       //   if (err){
//       //     console.log(err);
//       //   }
//       //   else{
//       //     console.log( "Results : ", doc);
//       //   }

//       //   return doc;
//       // });

//       const newTitle = updatedDeal.title;

//       // Update the title field for the deal ID in the MongoDB collection
//       await Job.updateOne(
//         { deal_id: dealId },
//         { $set: { title: newTitle } }
//       );
//     }

//     // Send a success response
//     res.status(200).json({ message: 'Webhook processed successfully' });
//   } catch (error) {
//     console.error('Error processing webhook:', error);
//     res.status(500).json({ message: 'Error processing webhook' });
//   }
// });

router.delete('/cleanup2', async (req, res) => {
  try {
    // const extraFieldExists = { title: { $exists: false } };
    const result = await Job.deleteMany();
    console.log(`Deleted ${result.deletedCount} documents without the extra field.`);
    res.status(200).json({ message: `Deleted ${result.deletedCount} documents.` });
  } catch (error) {
    console.error('Error deleting documents:', error);
    res.status(500).json({ message: 'Error deleting documents' });
  }
});

router.delete('/cleanup', async (req, res) => {
  try {
    const extraFieldExists = { title: { $exists: false } };
    const result = await Job.deleteMany(extraFieldExists);
    console.log(`Deleted ${result.deletedCount} documents without the extra field.`);
    res.status(200).json({ message: `Deleted ${result.deletedCount} documents without the extra field.` });
  } catch (error) {
    console.error('Error deleting documents:', error);
    res.status(500).json({ message: 'Error deleting documents' });
  }
});

//get all deals
router.get('/deals', async (req, res) => {
  try {
    console.log('Getting deals...');
    const api = new pipedrive.DealsApi(defaultClient);
    const { data } = await api.getDeals();

    // Map and upsert (update or insert) each deal
    const upsertedDeals = await Promise.all(data.map(async deal => {
      const mappedDeal = mapDeal(deal);
      console.log(deal);
      
      // Here's the findOneAndUpdate with upsert
      return await Job.findOneAndUpdate(
        { deal_id: mappedDeal.deal_id }, // find a document with this filter
        mappedDeal, // document to insert when nothing was found
        { upsert: true, new: true, runValidators: true } // options
      ).catch(console.error);
    }));

    console.log(`Upserted ${upsertedDeals.length} deals to MongoDB!`);
    res.status(200).json(upsertedDeals);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to retrieve deals.' });
  }
});


  
  router.get('/deal/:id', async (req, res) => {
    try {
      console.log('Getting deals by id...');
      const api = new pipedrive.DealsApi(defaultClient);
      const deal = await api.getDeal(req.params.id);
      res.json(deal);
    }
    catch(error) {
        res.status(500).json({message: error.message})
    }
      // Map and save each deal
    //   const savedDeals = await Promise.all(data.map(async deal => {
    //     const mappedDeal = mapDeal(deal);
    //     return await new Job(mappedDeal).save().catch(console.error);
    //   }));
  
//       console.log(`Saved ${savedDeals.length} deals to MongoDB!`);
//       res.status(200).json(savedDeals);
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: 'Failed to retrieve deals.' });
//     }
  });
  
  //get all people
  router.get('/fetch-technicians', async (req, res) => {
    try {
      // Fetch data from Pipedrive API
      const api = new pipedrive.PersonsApi(defaultClient);
      const { data } = await api.getPersons();
  
      // Map and save each technician
      const savedTechnicians = await Promise.all(data.map(async person => {
        const mappedTechnician = mapTechnician(person);
        return await new Technician(mappedTechnician).save();
      }));
  
      console.log(`Saved ${savedTechnicians.length} technicians to MongoDB!`);
      res.status(200).json(savedTechnicians);
    } catch (error) {
      console.error(error);
      res.status(500).send('An error occurred');
    }
  });

  // //Gets data about all deal fields
router.get('/dealFields', async (req, res) => {
    try {
        const api = new pipedrive.DealFieldsApi(defaultClient);
        const dealFields = await api.getDealFields();
        res.json(dealFields);
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
});

//react routes
// Define a route for getting job data
router.get('/jobs', async (req, res) => {
  try {
    const jobs = await Job.find(); // Query the MongoDB collection to get job data
    res.status(200).json(jobs); // Send the job data as a JSON response
  } catch (error) {
    console.error('Error fetching job data:', error);
    res.status(500).json({ message: 'Error fetching job data' });
  }
});

module.exports = router;
//uncomment  later
// router.post('/addDeal', async (req, res) => {
//     try {
//       console.log('Sending request...');
  
//       const dealsApi = new pipedrive.DealsApi(defaultClient);
  
//       const data = {
//         title: req.body.title,
//         value: req.body.value,
//         currency: req.body.currency,
//         user_id: req.body.user_id,
//         person_id: req.body.person_id,
//         org_id: req.body.org_id,
//         stage_id: req.body.stage_id,
//         status: req.body.status,
//         expected_close_date: req.body.expected_close_date,
//         probability: req.body.probability,
//         lost_reason: req.body.lost_reason,
//         visible_to: req.body.visible_to,
//         add_time: req.body.add_time,
//       };
  
//       const response = await dealsApi.addDeal(data);
  
//       console.log('Deal was added successfully!', response);
  
//       res.status(200).json(response);
//     } catch (error) {
//       console.error(error);
  
//       res.status(500).json({ message: 'Adding deal failed.' });
//     }
//   });

// router.get('/deals', async (req, res) => {
//     try {
//       console.log('Getting deals...');
//       const api = new pipedrive.DealsApi(defaultClient);
//       const deal = await api.getDeals();
//       const mappedDeal = mapDeal(deal.data);
//       const data = new MyModel(mappedDeal);
//       const savedData = await data.save();
//       console.log(`Saved deals to MongoDB!`);
//       res.status(200).json(data);
//     } catch (error) {
//       console.error(error);
  
//       res.status(500).json({ message: 'Failed to retrieve deals.' });
//     }
//   });  



  //get list of technicians
  
// router.get('/fetch-technicians', async (req, res) => {
//     try {
//       // Fetch data from Pipedrive API
//       const api = new pipedrive.DealsApi(defaultClient);
//     //   const response = await axios.get(`https://companydomain.pipedrive.com/api/v1/persons?api_token=API_KEY`);
//       const mappedTechnician = mapTechnician(person.data);
//       const data = new 
//       // Extract technicians and their IDs
//     //   const technicians = response.data.data.map(person => ({
//     //     name: person.name,
//     //     id: person.id,
//     //   }));
  
//       // Store in MongoDB
//       await Technician.insertMany(technicians);
  
//       res.send('Technicians fetched and stored successfully!');
//     } catch (error) {
//       console.error(error);
//       res.status(500).send('An error occurred');
//     }
//   });
//   router.post('/addDeal3', async (req, res) => {
//     try {
//       const api = new pipedrive.DealsApi(defaultClient);
//       const deal = await api.getDeal(req.body.deal_id);
//       const mappedDeal = mapDeal(deal.data);
//       const data = new Model(mappedDeal);
//       const savedData = await data.save();
//       res.json(savedData);
//     } catch (error) {
//       res.status(500).json({ message: error.message });
//     }
//   });
  
  //Get a single deal by ID Method
// router.get('/getDeal2/:id', async (req, res) => {
//     try {
//         const api = new pipedrive.DealsApi(defaultClient);
//         const deal = await api.getDeal(req.params.id);
//         res.json(deal);
//     }
//     catch(error){
//         res.status(500).json({message: error.message})
//     }
// });

//Update Deal
// router.put('/updateDeal/:deal_id', async (req, res) => {
//     try {
//       // Retrieve current deal data from Pipedrive
//       const api = new pipedrive.DealsApi(defaultClient);
//       const deal = await api.getDeal(req.params.deal_id);
//       const pipedriveData = deal.data;
  
//       // Map Pipedrive data to MongoDB format if necessary
//       const mappedData = mapDeal(pipedriveData);
  
//       // Update deal data in Pipedrive
//       const updatedDeal = {
//         ...pipedriveData,
//         stage_id: req.body.stage_id // Update stage ID
//       };
//       await api.updateDeal(req.params.deal_id, updatedDeal);
  
//       // Save updated deal data to MongoDB
//       const mongodb = await MongoClient.connect('mongodb://localhost:27017');
//       const db = mongodb.db('myapp');
//       const collection = db.collection('deals');
//       const result = await collection.replaceOne({ id: req.params.deal_id }, mappedData, { upsert: true });
  
//       // Return updated deal data to client
//       res.json(updatedDeal);
//     } catch (error) {
//       res.status(500).json({ message: error.message });
//     }
//   });

// router.post('/post2', async (req, res) => {
//     if (!req.body || !req.body.name) {
//         return res.status(400).json({ message: 'Name is required' });
//     }
//     const data = new Model({
//         name: req.body.name,
//     });

//     try {
//         const savedData = await data.save();
//         res.status(200).json(savedData);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// });

// //Get by ID Method
// router.get('/getOne/:id',async (req, res) => {
//     try {
//         const data = await Model.findById(req.params.id);
//         res.json(data)
//         console.log(data);
//     }
//     catch(error){
//         res.status(500).json({message: error.message})
//     }
// });

// //Update by ID Method
// router.patch('/update/:id', async (req, res) => {
//     try {
//         const id = req.params.id;
//         const updatedData = req.body;
//         const options = { new: true};

//         const result = await Model.findByIdAndUpdate(
//             id, updatedData, options
//         )

//         res.send(result)
//     }
//     catch (error) {
//         res.status(400).json({ message: error.message })
//     }
// });

// //Delete by ID Method
// router.delete('/delete/:id', async (req, res) => {
//     try {
//         const id = req.params.id;
//         const data = await Model.findByIdAndDelete(id)
//         res.send(`Document with ${data.name} has been deleted..`);
//     }
//     catch(error) {
//         res.status(500).json({ message: error.message})
//     }
// });
// })();



