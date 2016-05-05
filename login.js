var express    = require('express'),
    bodyParser = require('body-parser'),
    User       = require('../models/user'),
    jwt        = require('jsonwebtoken');

var router = express.Router();

router
    .use(bodyParser.urlencoded({ extended: true }))
    .use(bodyParser.json())
    .post('/signin', function (req, res) {
        if (!req.body.username) {
            res.status(400).send('username required');
            return;
        }
        if (!req.body.password) {
            res.status(400).send('password required');
            return;
        }

        User
        .findOne({ username: req.body.username })
        .then(function(user) {
            if (user.authenticate(req.body.password)) {
                var token = jwt.sign(user, 'notSoSecret', {
                    expiresInMinutes: 1440 // expires in 24 hours
                });
                res.status(200).send(token);
            } else {
                res.status('401').send('Invalid Password');
//                res.redirect('/#/login');
            }
        });
    })
    .post('/signup', function (req, res) {
        User
        .findOne({ username: req.body.username })
        .then(function (user) {
            user.password = req.body.password;
            user
            .save()
            .then(function (user) {
//                req.session.userId = user._id;
//                res.redirect('/#/posts');
            });
        });

    })
    .get('/signout', function (req, res) {
//        res.redirect('/#/login');
    });

module.exports = router;
