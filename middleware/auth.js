module.exports = function(req, res, next) {
    console.log(req.session.isAuthenticated);
    if (!req.session.isAuthenticated) {
        return res.redirect('/auth/login')
    }

    next();
}