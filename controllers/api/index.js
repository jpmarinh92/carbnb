const router = require('express').Router();

const userRoutes = require('./user-routes.js');
const carRoutes = require('./car-routes.js');
const rentRoutes = require('./rent-routes.js')

router.use('/users', userRoutes);
router.use('/cars', carRoutes);
router.use('/rent', rentRoutes);


module.exports = router;