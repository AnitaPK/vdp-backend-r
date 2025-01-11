const jwt = require('jsonwebtoken');

exports.auth = (req, res, next) => {
    let token = req.header('Authorization');
    // console.log(token);
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }
    try {
        token = token.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user;
        // console.log("******",decoded.user);
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
};

exports.doctor = (req, res, next) => {
    console.log('isDoctor', req.user.isDoctor)
    if (!req.user.isDoctor) {
        return res.status(403).json({ msg: 'Access denied, doctor only' });
    }
    next();
};
