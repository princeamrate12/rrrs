var express = require('express');
var router = express.Router();

var request_controller = require('../controllers/requestController');
var user_controller = require('../controllers/userController');

//Display dashboard GET
router.get('/dashboard', user_controller.user_dashboard_get);

//Handle profile update POST
router.post('/update', user_controller.user_update_post);

//Handle change password POST
// router.post('/changepass', user_controller.user_changepass_post);

//Handle logout GET
router.get('/logout', user_controller.user_logout_get);

module.exports = router;