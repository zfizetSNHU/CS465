const express = require('express');
const router = express.Router();
const tripsController = require('../controllers/trips');
const authController = require("../controllers/authentication");
const { expressjwt: expressJwt } = require("express-jwt"); // express-jwt middleware
const jwt = require('jsonwebtoken'); // manual JWT verification

// express-jwt middleware
const auth = expressJwt({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"],
    userProperty: "auth", // decoded token will be in req.auth
});

// Custom JWT middleware from the guide
/*
function authenticateJWT(req, res, next) {
    const authHeader = req.headers['authorization'];
    if(!authHeader) return res.status(401).json({ message: 'Auth header required' });

    const token = authHeader.split(' ')[1];
    if(!token) return res.status(401).json({ message: 'Bearer token missing' });

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if(err) return res.status(403).json({ message: 'Token validation error' });
        req.auth = decoded;
        next();
    });
}
*/

// Auth routes
router.route('/register').post(authController.register);
router.route('/login').post(authController.login);

// Trip routes
router.route('/trips')
    .get(tripsController.tripsList)
    .post(auth, tripsController.tripsAddTrip); // protected route

router.route('/trips/:tripCode')
    .get(tripsController.tripsFindByCode)
    .put(auth, tripsController.tripsUpdateTrip); // protected route

module.exports = router;
