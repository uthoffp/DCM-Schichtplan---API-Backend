const express = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config();


//controller
const companyController = require('./controller/companyController');
const loginController = require('./controller/loginController');
const departmentController = require('./controller/departmentController');
const timeController = require('./controller/timeController');
const abRequestController = require('./controller/absenceRequestController')


// API Server Config
const app = express();
const port = process.env.APP_PORT;
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));
app.use(express.json())
app.listen(port, () => console.log(`Webserver started on http://localhost:${port}`));


//Routes
app.get('/', (req, res) => res.send("DCM Schichtplan API"))
app.get('/company', (req, res) => companyController.allCompanies(res));
app.get('/company/:cId/login/:email', (req, res) => loginController.login(req, res));
app.post('/company/:cId/block/:email, ', (req, res) => loginController.blockAccount(req, res));
app.post('/company/:cId/user/:uId/changepw', authenticateToken, (req, res) => loginController.changePassword(req, res));

app.get('/company/:cId', authenticateToken, (req, res) => companyController.companyData(req, res));
app.get('/company/:cId/specialtime/:type', authenticateToken, (req, res) => companyController.specialTime(req, res));
app.get('/company/:cId/specialtime/', authenticateToken, (req, res) => companyController.specialTimeAll(req, res));
app.get('/company/:cId/specialtime/sub', authenticateToken, (req, res) => companyController.subSpecialTime(req, res));
app.get('/company/:cId/settings', authenticateToken, (req, res) => companyController.subSpecialTime(req, res));

app.get('/company/:cId/department/:dep', authenticateToken, (req, res) => departmentController.departmentData(req, res));
app.get('/company/:cId/user/:uId/department/', authenticateToken, (req, res) => departmentController.userDepartment(req, res));

app.get('/company/:cId/user/:uId/actual/:start/:end', authenticateToken, (req, res) => timeController.timeActual(req, res));
app.get('/company/:cId/user/:uId/planned/:start/:end', authenticateToken, (req, res) => timeController.timePlanned(req, res));
app.get('/company/:cId/user/:uId/actual/latest', authenticateToken, (req, res) => timeController.latestTimes(req, res));
app.post('/company/:cId/user/:uId/clocking', authenticateToken, (req, res) => timeController.clocking(req, res));

app.post('/company/:cId/user/:uId/abrequest', authenticateToken, (req, res) => abRequestController.addAbRequest(req, res));
app.get('/company/:cId/user/:uId/holidays/:start/:end', authenticateToken, (req, res) => abRequestController.getHolidays(req, res));


//Verify access-token
function authenticateToken(req, res, next) {
    const token = req.headers['auth'];
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, userData) => {
        if (err) return res.sendStatus(403.).send('Invalid token.');

        //check if user has permission
        if (req.params.cId !== undefined && req.params.cId !== userData.Company) return res.sendStatus(401);
        if (req.params.uId !== undefined && req.params.uId !== userData.EmployeeNumber) return res.sendStatus(401);
        if (req.params.email !== undefined && req.params.uId !== userData.EMail) return res.sendStatus(401);
        next();
    });
}