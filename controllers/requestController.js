var User = require('../models/user');
var Request = require('../models/request');

var auth = require('./authorizationPermissions');

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

//Display list of all request
exports.user_view_request_get = function(req, res, next){
    res.send("view all request");
}

//Update Request POST
exports.request_update_post = function(req, res, next){
    requestid = req.body.request_id;
    var request = new Request({
        status: req.body.status,
		engineer: req.body.engineer,
		contractor: req.body.contractor,
	});

	User.findByIdAndUpdate(requestid, request, function (err, updated) {
		if (err) {
			return next(err);
		} else {
			console.log("request updated");
			res.redirect('/user/dashboard');
		}
	})
}

//Handle quotation POST
exports.user_generate_quotation_post = function(req, res, next){
    res.send("Quotation post");
}