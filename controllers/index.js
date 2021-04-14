const router = require('express').Router();
const apiRoutes = require('./api');
const homeRoutes = require('./homeroutes');
const dashRoutes = require('./dashRoutes');

router.use('/api', apiRoutes);
router.use('/', homeRoutes);
router.use('./dashboard', dashRoutes);

router.use((req,res) => {
    res.status(404).end();
})

module.exports = router;