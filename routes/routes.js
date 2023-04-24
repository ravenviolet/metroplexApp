const express = require('express');
const router = express.Router();
const Model = require('../models/model');
const pipedrive = require('pipedrive');
const { mapDeal } = require('../pipeMap.js')
// const { generateSchema } = require('../schemaGenerator');
const database = require('../index').database;

// (async () => {
// const dataSchema = await generateSchema();
// const Model = database.model('Data', dataSchema);

const defaultClient = new pipedrive.ApiClient();
let apiToken = defaultClient.authentications.api_key;
apiToken.apiKey = 'adee9abc6e0b3449db978340e0fd9ea104923205';

//Get Deal Method
// router.get('/getDeal', async (req, res) => {
//     const api = new pipedrive.DealsApi(defaultClient);
//     try {
//       const deals = await api.getDeals();
//       const mappedDeals = deals.data.map(mapDeal);
//       console.log(mappedDeals);
//       const savedDeals = await Model.insertMany(mappedDeals);
//       res.json(savedDeals);
//     } catch (error) {
//       res.status(500).json({ message: error.message });
//     }
// });

//Get Deal Method
// router.get('/getDeal/:id', async (req, res) => {
//     try {
//         const api = new pipedrive.DealsApi(defaultClient);
//         const deal = await api.getDeal(req.params.id);
//         const mappedDeal = mapDeal(deal.data);
//         const data = new Model(mappedDeal);
//         const savedData = await data.save();
//         res.json(savedData);
//       } 
//       catch (error) {
//         res.status(500).json({ message: error.message })
//       }
// });

router.post('/addDeal', async (req, res) => {
    try {
    //   const deal_id = 1;
      const api = new pipedrive.DealsApi(defaultClient);
      const deal = await api.getDeal(req.body.deal_id);
      const mappedDeal = mapDeal(deal.data);
      const data = new Model(mappedDeal);
      const savedData = await data.save();
      res.json(savedData);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
//Get a single deal by ID Method
router.get('/getDeal2/:id', async (req, res) => {
    try {
        const api = new pipedrive.DealsApi(defaultClient);
        const deal = await api.getDeal(req.params.id);
        res.json(deal);
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
});

//Gets data about all deal fields
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

router.post('/post2', async (req, res) => {
    if (!req.body || !req.body.name) {
        return res.status(400).json({ message: 'Name is required' });
    }
    const data = new Model({
        name: req.body.name,
    });

    try {
        const savedData = await data.save();
        res.status(200).json(savedData);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

//Get All Method
router.get('/getAll', async (req, res) => {
    try{
        const data = await Model.find();
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
});

//Get by ID Method
router.get('/getOne/:id',async (req, res) => {
    try {
        const data = await Model.findById(req.params.id);
        res.json(data)
        console.log(data);
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
});

//Update by ID Method
router.patch('/update/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true};

        const result = await Model.findByIdAndUpdate(
            id, updatedData, options
        )

        res.send(result)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
});

//Delete by ID Method
router.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Model.findByIdAndDelete(id)
        res.send(`Document with ${data.name} has been deleted..`);
    }
    catch(error) {
        res.status(500).json({ message: error.message})
    }
});
// })();

module.exports = router;
