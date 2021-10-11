const express = require('express');
const app = express();
const PORT = 8080;

app.use(express.json())
app.listen(PORT, () => console.log("Webserver started on http://localhost:"+PORT));

const db = require('./Controller/db_connect');
app.get('/', (req, res) => {
    db.db_connect().then(result => {
        res.send(result);
    })
});

app.get('/login/:email', function (req, res) {
    res.send({
        email: req.params.email,
        pw: req.query.pw
    });
    //res.status(404).send('not found message');
});

