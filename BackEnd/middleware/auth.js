const config = require('config');
const jwt = require('jsonwebtoken');

function auth(req, res, next) {
    //console.log(req);
    const token = req.header('x-auth-token');
    //console.log(token);
    if (!token){
        return res.status(401).send('Access denied. No token provided.')
    }

    try {
        const decoded = jwt.verify(token, config.get('jwtSecret'));
        req.user = decoded;
        console.log(decoded);
        return next();
    } catch (ex) {
        return res.status(400).send('Invalid token');
    }
}

module.exports = auth;