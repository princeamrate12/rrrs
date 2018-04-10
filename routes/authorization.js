exports.checkSignIn = function (req, res, next) {
    if (req.session.user) {
        next();     //If session exists, proceed to page
    } else {
        var err = new Error("Not logged in!");
        err.status = 401;
        next(err);  //Error, trying to access unauthorized page!
    }
}