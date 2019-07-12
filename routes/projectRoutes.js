const express = require('express');
const router = express.Router();

const projectDB = require('../data/helpers/projectModel.js');

// POST


// GET ALL
router.get('/', (req, res) => {
    projectDB.get()
    .then(projects => {
        res.status(200).json(projects);
    })
    .catch(error => {
        res.status(500).json({ error: "The projects could not be retrieved." });
    })
})

// GET BY ID
router.get('/:id', validateProjectId, (req, res) => {
    const { id } = req.params;
    projectDB.get(id)
    .then(project => {
        res.status(200).json(project);
    })
    .catch(error => {
        res.status(500).json({ error: "The project could not be retrieved." });
    })
})

// PUT

// DELETE

// MIDDLEWARE

function validateProjectId(req, res, next) {
    const { id } = req.params;
    projectDB.get(id)
    .then(project => {
        if (project === null) {
            return res.status(404).json({ message: "The project ID does not exist." })
        } else {
            next();
        }
    })
    .catch(error => {
        return res.status(500).json({ error: "The project ID could not be verified." });
    })
}


module.exports = router;