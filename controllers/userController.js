var User = require('../models/user');
var request = require('../models/request');

var auth = require('./authorizationPermissions');

const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

//Display SignUp Form GET
exports.user_create_get = function (req, res, next) {
    res.render('signup');
}

//Handle SignUp Form POST
exports.user_create_post = function (req, res, next) {
    User.findOne({ 'email': req.body.email }).exec(function (err, found_user) {
        if (err) { next(err); }
        if (found_user) {
            err = new Error("User Exist");
            return next(err);
        } else {
            var userdetail = {
                first_name: req.body.fname,
                last_name: req.body.lname,
                password: req.body.password,
                email: req.body.email,
                mobile: req.body.mobile,
                user_type: req.body.userType
            }

            var user = new User(userdetail);

            user.save(function (err) {
                if (err) { return next(err); }
                req.session.user = found_user;
                res.redirect('/user/dashboard');
            });
        }
    });
}

//Display login form GET
exports.user_login_get = function (req, res, next) {
    res.render('index');
}

//Handle Login form POST
exports.user_login_post = function (req, res, next) {
    User.findOne({ email: req.body.email, password: req.body.password }, function (err, user) {
        if (err) { return next(err); }
        if (!user) {
            var err = new Error("User not found");
            err.status = 403;
            return next(err);
        }
        req.session.user = user;
        res.redirect('/user/dashboard');
    });
}

//Display dashboard GET
exports.user_dashboard_get = function (req, res, next) {
    var data = {
        userType: req.session.user.user_type
    }
    res.render('dashboard', { data: data });
}

//Handle update profile POST
exports.user_update_post = function (req, res, next) {
    user = req.session._id;
    console.log("user");
    var userdetail = {
        first_name: req.body.fname,
        last_name: req.body.lname,
        password: req.body.password,
        email: req.body.email,
        mobile: req.body.mobile,
        _id: req.session.user._id
    }

    User.findByIdAndUpdate(user, userdetail, function (err, updated) {
        if (err) {
            return next(err);
        } else {
            console.log("user updated");
            res.redirect('/user/dashboard');
        }
    })
};

//HAndle user logout POST
exports.user_logout_get = function (req, res, next) {
    req.session.destroy(function () {
        res.redirect('/');
    });
};