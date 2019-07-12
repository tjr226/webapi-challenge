const express = require('express');
const router = express.Router();

const actionDB = require('../data/helpers/actionModel.js');

// POST

// GET ALL
router.get('/', (req, res) => {
    actionDB.get()
    .then(actions => {
        res.status(200).json(actions);
    })
    .catch(error => {
        res.status(500).json({ error: "The ACTIONS could not be retrieved." });
    })
})

// PUT

// DELETE

// MIDDLEWARE



module.exports = router;