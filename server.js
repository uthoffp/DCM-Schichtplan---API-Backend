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

// Routes
app.get('/company/:cId/login/:email', (req, res) => loginController.login(req, res));
app.post('/company/:cId/block/:email, ', (req, res) => loginController.blockAccount(req, res))

app.get('/company/:cId', authenticateToken, (req, res) => companyController.companyData(req, res));
app.get('/company/:cId/specialtime/:type', authenticateToken, (req, res) => companyController.specialTime(req, res));

//Verify access-token
function authenticateToken(req, res, next) {
    const token = req.headers['auth'];
    if (token == null) return res.sendStatus(401).send('Missing access-token.');

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, userData) => {
        if (err) return res.sendStatus(403.).send('Invalid token.');

        //check if user has permission
        if(req.params.cId != undefined && req.params.cId != userData.Company) return res.sendStatus(401);
        if(req.params.uId != undefined && req.params.uId != userData.EmployeeNumber) return res.sendStatus(401);
        if(req.params.email != undefined && req.params.uId != userData.EMail) return res.sendStatus(401);
        next();
    });
}