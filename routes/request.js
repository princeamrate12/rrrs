var express = require('express');
var router = express.Router();

var User = require('../models/user');
var Request = require('../models/request');

var auth = require('./authorization');

//HOME ROUTE
router.post('/generate', function(req, res, next){
    var requestDetail = {
        user: req.session.user,
        address: {
            lat: Number(req.body.lat),
            lng: Number(req.body.lng)
        },
        status: "submitted"
    }
    var request = new Request(requestDetail);
    request.save(function(err, saved){
        if(err){
            return next(err);
        } else {
            res.send("saved");
            // res.redirect('/dashboard');
        }
    })
})
module.exports = router;