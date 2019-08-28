var express = require('express');
var router = express.Router();
var soap = require('soap');
var URL = "http://localhost:4789/ws/pacient?wsdl";

router.get('/', (req, res)=>{
    res.locals.connection.query('select * from pacient',(err, rows, fields)=>{
        if (err) throw err;
        res.send(JSON.stringify(rows));
    });
});

router.post('/', (req, res)=>{
    let query = 'insert into pacient (name, surname, email, phone, blood_type, health_plan) values (?, ?, ?, ?, ?, ?)';
    let args = [
        req.body.name,
        req.body.surname,
        req.body.email,
        req.body.phone,
        req.body.bloodType,
        req.body.healthPlan,
    ]

    res.locals.connection.query(query, args,(err, rows, fields)=>{
        if (err) throw err;

        // Postgres integration
        soap.createClient(URL, (err, client) => {
          if (err) throw err;

          var argsObj = {
            name: req.body.name,
            surname :req.body.surname,
            email: req.body.email,
            phone: req.body.phone,
            bloodType: req.body.bloodType,
            healthPlan: req.body.healthPlan,
            integId: rows.insertId
          }

          // call insert method
          client.insert(argsObj, (err, result) => {
            if (err) throw err;
            rows.successIntegration = result.return;
            res.send(JSON.stringify(rows));
          });
        });
        
    });
});

router.put('/:id', (req, res)=>{
    let query = 'update pacient set name = ?, surname = ?, email = ?, phone = ?, blood_type = ?, health_plan = ? where pacient_id = ?';
    let args = [
        req.body.name,
        req.body.surname,
        req.body.email,
        req.body.phone,
        req.body.bloodType,
        req.body.healthPlan,
        req.params.id,
    ]

    res.locals.connection.query(query, args,(err, rows, fields)=>{
        if (err) throw err;

        // Postgres integration
        soap.createClient(URL, (err, client) => {
          if (err) throw err;

          var argsObj = {
            name: req.body.name,
            surname :req.body.surname,
            email: req.body.email,
            phone: req.body.phone,
            bloodType: req.body.bloodType,
            healthPlan: req.body.healthPlan,
            integId: req.params.id
          }

          // call update method
          client.update(argsObj, (err, result) => {
            if (err) throw err;
            rows.successIntegration = result.return;
            res.send(JSON.stringify(rows));
          });
        });
    });
});

router.get('/:id', (req, res)=>{
    let query = 'select * from pacient where pacient_id = ?';

    res.locals.connection.query(query, [req.params.id], (err, rows, fields)=>{
        if (err) throw err;
        res.send(JSON.stringify(rows));
    });
});

router.delete('/:id', (req, res)=>{
    let query = 'delete from pacient where pacient_id = ?';

    res.locals.connection.query(query, [req.params.id], (err, rows, fields)=>{
        if (err) throw err;

        // Postgres integration
        soap.createClient(URL, (err, client) => {
          if (err) throw err;

          var argsObj = {
            integId: req.params.id
          }

          // call delete method
          client.delete(argsObj, (err, result) => {
            if (err) throw err;
            rows.successIntegration = result.return;
            res.send(JSON.stringify(rows));
          });
        });
    });
});

module.exports = router;
