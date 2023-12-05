

module.exports = {
    checkSession: (req, res, next) => {
        if (req.url === '/user/login' || req.url === '/user/register' || req.url === '/user/googleLogin' || req.url === '/user/requestPasswordReset' || req.url === '/user/resetPassword') {
            next()
        }
        else if (req.session && req.session.user) {
            next();
        } else {
            res.status(401).json({ message: 'Unauthorized' });
            next(); // or redirect, etc.
        }
    }
}