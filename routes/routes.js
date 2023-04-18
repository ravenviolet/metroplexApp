const express = require('express');
const router = express.Router()
module.exports = router;
const Model = require('../models/model');
router.post('/post2', (req, res) => {
    console.log(req.body);
    if (!req.body || !req.body.name) {
        return res.status(400).json({ message: 'Name is required' });
    }
    const data = new Model({
        name: req.body.name,
    });
    data.save((err, savedData) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        res.status(200).json(savedData);
    });
});

router.post('/post', (req, res) => {
res.send('Post API')
})

//Get all Method
router.get('/getAll', (req, res) => {
    try{
        const data = Model.find();
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//Get by ID Method
router.get('/getOne/:id', (req, res) => {
    res.send(req.params.id)
})

//Update by ID Method
router.patch('/update/:id', (req, res) => {
    res.send('Update by ID API')
})

//Delete by ID Method
router.delete('/delete/:id', (req, res) => {
    res.send('Delete by ID API')
})
