const User = require('../model/User');

const express = require('express');
const router = module.exports = express.Router();

router.post('/signup', function(req, res) {
    let user = new User(req.body);
    user.save()
        .then(userData => {
            res.status(200).send(userData).end();
        })
        .catch(err => {
            console.log(err);
            res.status(400).end();
        });
});

router.post('/login', function(req, res) {
    let user = new User(req.body);
    user.fetch()
        .then(userData => {
            if (req.body.password != userData.password) {
                res.sendStatus(400).end();
            }
            res.status(200).send(userData).end();
        })
        .catch(err => {
            console.log(err);
            res.status(400).end();
        });
});