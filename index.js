const cors = require('cors');
const express = require('express');
const server = express();

// const helmet = require('helmet');

const actionRoutes = require('./routes/actionRoutes.js');
const projectRoutes = require('./routes/projectRoutes.js');

server.use(logger);
server.use(cors());
server.use(express.json());
// server.use(helmet());
server.use('/api/actions', actionRoutes);
server.use('/api/projects', projectRoutes);

server.use('/', (req, res) => res.send("API working"));

const port = 5000;

function logger(req, res, next) {
    console.log(
        `[${new Date().toISOString()}] ${req.method} to ${req.url} from ${req.get('Origin')}`
    );
    next();
}


server.listen(port, () => console.log(`running on port ***${port}***`));