const express = require('express');
const jwt = require('jsonwebtoken');
const db = require('./Controller/db_connect');
const company = require('./Controller/CompanyController');
require('dotenv').config();

const app = express();
const PORT = 8080;
app.use(express.json())
app.listen(PORT, () => console.log("Webserver started on http://localhost:" + PORT));

app.get('/', (req, res) => db.db_connect().then(result => res.send(result)));
app.get('/company/:id', (req, res) => company.contactData(req.params.id).then(result => res.send(result)));
app.get('/login/:email', (req, res) => {
    const user = {email: req.params.email, pw: req.query.pw}
    const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '15s'});
    res.json({access_token: token});
});
//res.status(404).send('not found message');

function authenticateToken(req, res, next) {
    const token = req.headers['auth'];
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, content) => {
        if (err) return res.sendStatus(403);
        next();
    });
}

console.log(require('./Controller/encrypt').encrypt('test'));