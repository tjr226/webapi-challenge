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

// GET BY ID
router.get('/:id', validateActionId, (req, res) => {
    const { id } = req.params;
    actionDB.get(id)
    .then(action => {
        res.status(200).json(action);
    })
    .catch(error => {
        res.status(500).json({ error: "The action could not be retrieved." });
    })
})

// PUT

// DELETE

// MIDDLEWARE

function validateActionId(req, res, next) {
    const { id } = req.params;
    actionDB.get(id)
    .then(action => {
        if (action === null) {
            return res.status(404).json({ message: "The action ID does not exist." })
        } else {
            next();
        }
    })
    .catch(error => {
        return res.status(500).json({ error: "The action ID could not be verified." });
    })
}

module.exports = router;