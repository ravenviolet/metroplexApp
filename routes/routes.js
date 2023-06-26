const express = require('express');
const router = express.Router();
const { Job, Technician } = require('../models/model');
const pipedrive = require('pipedrive');
const { mapDeals, mapDeal, mapTechnician } = require('../pipeMap.js');
const defaultClient = new pipedrive.ApiClient();
// const cors = require('cors');

router.use(express.json());
// router.use(cors());
let apiToken = defaultClient.authentications.api_key;
apiToken.apiKey = 'f4c82e6bb626151a0936fbb415abbd423dca23da';

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

//get all deals - comment3
router.get('/deals', async (req, res) => {
  try {
    console.log('Getting deals...');
    const api = new pipedrive.DealsApi(defaultClient);
    const { data } = await api.getDeals();
    console.log(data);
    console.log('Got deals, mapping...');
    const updatedDeals = data.map(deal => mapDeals(deal));
    console.log('Mapped deals, saving...');
    const savedDeals = await Job.insertMany(updatedDeals);
    console.log('Saved deals');
    res.status(200).json({ message: 'Deals retrieved and saved successfully' });
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

router.get('/techs', async (req, res) => {
  try {
    const techs = await Technicians.find(); // Query the MongoDB collection to get tech data
    res.status(200).json(techs); // Send the tech data as a JSON response
  } catch (error) {
    console.error('Error fetching tech data:', error);
    res.status(500).json({ message: 'Error fetching  data' });
  }
});

module.exports = router;
