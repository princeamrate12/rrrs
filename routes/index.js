var express = require('express');
var router = express.Router();

var User = require('../models/user');
var auth = require('./authorization');

//HOME ROUTE
router.get('/', function (req, res, next) {
    res.render('index');
});

// SIGNUP ROUTE
router.get('/signup', function (req, res, next) {
    res.render('signup');
})

router.post('/signup', function (req, res, next) {
    User.findOne({'email': req.body.email})
        .exec(function (err, found_user) {
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
                    req.session.user = user;
                    res.redirect('/user/dashboard');
                });
            }
        });
});

//LOGIN ROUTE
router.post('/login', function (req, res, next) {
    User.findOne({ email: req.body.email, password: req.body.password }, function (err, user) {
        if (err) {return next(err);}
        if (!user) {
            var err = new Error("User not found");
            err.status = 403;
            return next(err);
        }
        req.session.user = user;
        // res.send(user);
        res.redirect('/user/dashboard');
    });
});

//LOGOUT ROUTES
router.get('/logout', [auth.checkSignIn, function (req, res) {
    req.session.destroy(function () {
        console.log("User Logged Out");
        res.redirect('/');
    });
}]);

module.exports = router;