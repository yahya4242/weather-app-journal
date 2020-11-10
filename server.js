// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();
/* Middleware*/
const bodyParser = require('body-parser');

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
/*set the port for the server*/
const port = 3000;
/*start the server*/
const server = app.listen(port, listening);

function listening() {
    console.log(`server is listening on port:${port}`);
};


/*POST route*/
app.post('/add', (req, res) => {
    console.log(req.body);
    projectData.date = req.body.date;
    projectData.temp = req.body.temp;
    projectData.content = req.body.content;
    console.log(projectData);
});

/*GET route*/
app.get('/all', (req, res) => {
    res.send(projectData);
});