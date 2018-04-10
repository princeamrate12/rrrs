var express = require('express');
var router = express.Router();

var User = require('../models/user');
var Request = require('../models/request');

var auth = require('./authorization');

//HOME ROUTE
router.get('/dashboard', [
    auth.checkSignIn,
    function(req, res, next){
        var data = {
            userType: req.session.user.user_type
        }
        res.render('dashboard', {data: data});
    }
]);

module.exports = router;