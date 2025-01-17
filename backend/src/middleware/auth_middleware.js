const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    console.log('Authentication token: ' + JSON.stringify(token));
    const decoded = jwt.decode(token);
    console.log("Decoded Token:", decoded);

    if (typeof token === 'string') {
        console.log('Token is a string:', token);
    } else {
        console.log('Token is not a string');
    }
    console.log(token.length);

    if (token.length === 0) {
        return res.status(401).json({ message: 'Authentication token required' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Invalid token' });
    }
};

module.exports = authenticate;
