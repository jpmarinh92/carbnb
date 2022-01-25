const router = require('express').Router();

const apiRoutes = require('./api/');
const homeRoutes = require('./home-routes.js');
const carRoutes = require('./car-routes.js')
// const dashboardRoutes = require('./dashboard-routes.js');
// const postRoutes = require('./post-routes.js');

router.use('/', homeRoutes);
router.use('/cars', carRoutes);
// router.use('/dashboard', dashboardRoutes);
router.use('/api', apiRoutes);
// router.use('/posts', postRoutes);

module.exports = router;