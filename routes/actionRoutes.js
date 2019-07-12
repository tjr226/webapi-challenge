const express = require('express');
const router = express.Router();

const actionDB = require('../data/helpers/actionModel.js');
const projectDB = require('../data/helpers/projectModel.js');

// POST
router.post('/', validateAction, (req, res) => {
    const actionInfo = req.body;
    actionDB.insert(actionInfo)
    .then(action => {
        res.status(201).json(action);
    })
    .catch(error => {
        res.status(500).json({ error: "The action could not be created." });
    })
})

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
router.put('/:id', validateAction, validateActionId, (req, res) => {
    const { id } = req.params;
    actionInfo = req.body;
    actionDB.update(id, actionInfo)
    .then(response => {
        res.status(200).json(response);
    })
    .catch(error => {
        res.status(500).json({ error: "The action could not be modified." });
    })
})

// DELETE
 router.delete('/:id', validateActionId, (req, res) => {
     const { id } = req.params;
     actionDB.remove(id)
     .then(response => {
         res.status(200).json(response);
     })
     .catch(error => {
         res.status(500).json({ error: "The action could not be deleted." });
     })
 })


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

function validateAction(req, res, next) {
    const actionInfo = req.body;
    
    if (actionInfo.project_id === undefined ||
        actionInfo.description === undefined ||
        actionInfo.notes === undefined ||
        actionInfo.description.length > 128) {
            return res.status(400).json({ errorMessage: "Please include project ID, description under 128 chars, and notes."})
        } else {
            projectDB.get(actionInfo.project_id)
            .then(project => {
                if (project === null) {
                    return res.status(404).json({ message: "The project ID does not exist." });
                } else {
                    next();
                }
            })
            .catch(error => {
                return res.status(500).json({ error: "The project ID could not be verified." });
            })
        }
}



module.exports = router;