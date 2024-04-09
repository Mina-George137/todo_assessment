const express = require('express');
const app = express();

// use dotenv to secure the environment variables
require('dotenv').config();
const port = process.env.PORT || 3000;

// use cors to allow requests from the frontend
const cors = require('cors');
app.use(cors({
    origin: '*'
}));

// use body-parser to parse the request body
const bodyParser = require('body-parser');
app.use(bodyParser.json({ limit: '1mb' }));

// use the routes
const {userRoutes, taskRoutes} = require('./src/routes/routes');
app.use('/user', userRoutes);
app.use('/task', taskRoutes);


app.get('/', (req, res) => {res.json({message: 'TO-DO app listening'})})


app.listen(port, () => console.log('TO-DO app listening on port ' + port +'!'))