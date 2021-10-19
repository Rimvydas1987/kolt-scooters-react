const express = require('express')
const app = express()
const port = 3003
const mysql = require('mysql')
const cors = require('cors')
app.use(cors())

app.use(express.urlencoded({
    extended: true
}))
app.use(express.json());

const con = mysql.createConnection({
    host: 'localhost',
    user: 'Rimvydas',
    password: '123456789',
    database: 'paspirtukynas'
})

con.connect(err => {
    if (err) {
        throw err;
    }
    console.log('Yes, pavarom!');
})


// Iraso nauja posta
app.post('/scooters', (req, res) => {
    console.log('Just added: ' + req.body.registration_code)
    const sql = `
    INSERT INTO scooters
    (registration_code, is_busy, last_use_time, total_ride_kilometres)
    VALUES (?, ?, ?, ?)
    `;
    con.query(sql, [req.body.registration_code, req.body.is_busy, req.body.last_use_time, req.body.total_ride_kilometres], (err, result) => {
        if (err) {
            throw err;
        }
        res.send(result);
    })
})

// rodo visus postus
app.get('/scooters', (req, res) => {
    con.query('SELECT * FROM scooters ORDER BY id DESC', (err, results) => {
        if (err) {
            throw err;
        }
        res.json(results);
    })
})

// Trina posta
app.delete('/scooters/:id', (req, res) => {
    const sql = `
        DELETE FROM scooters
        WHERE id = ?
        `;
    con.query(sql, [req.params.id], (err, result) => {
        if (err) {
            throw err;
        }
        res.send(result);
    })
})

//Redagavimas
app.put('/scooters/:id', (req, res) => {
    const sql = `
        UPDATE scooters
        SET registration_code = ?, is_busy = ?, last_use_time = ?, total_ride_kilometres = ?
        WHERE id = ?
        `;
    con.query(sql, [
        req.body.registration_code, 
        req.body.is_busy, 
        req.body.last_use_time, 
        req.body.total_ride_kilometres, 
        req.params.id
    ], (err, result) => {
        if (err) {
            throw err;
        }
        res.send(result);
    })
})


// skaiciuoka irasus
app.get('/scooters/count', (req, res) => {
    con.query('SELECT COUNT(id) AS scootersCount FROM scooters', (err, results) => {
        if (err) {
            throw err;
        }
        res.json(results);
    })
})


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})