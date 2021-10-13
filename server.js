const express = require('express');
const jwt = require('jsonwebtoken');

//Controller
const companyController = require('./Controller/companyController');
const loginController = require('./Controller/loginController');
require('dotenv').config();

// API Server Config
const app = express();
const PORT = 8080;
app.use(express.json())
app.listen(PORT, () => console.log("Webserver started on http://localhost:" + process.env.APP_PORT));

//Routes
app.get('/company/:cId/login/:email', (req, res) => loginController.login(req, res));
app.get('/company/:cId', authenticateToken, (req, res) => companyController.contactData(req.params.cId).then(result => res.send(result)));
//res.status(404).send('not found message');

//Verify
function authenticateToken(req, res, next) {
    const token = req.headers['auth'];
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, content) => {
        if (err) return res.sendStatus(403);
        next();
    });
}