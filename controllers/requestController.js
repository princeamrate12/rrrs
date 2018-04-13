var User = require('../models/user');
var Request = require('../models/request');

var auth = require('./authorizationPermissions');

const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

//Handle Generate Request POST
exports.user_generate_request_post = function (req, res, next) {
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
            // res.send("saved");
            res.redirect('/user/dashboard');
        }
    })
}