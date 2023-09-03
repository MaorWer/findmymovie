const passport = require('passport');
const { Router } = require('express');

const makerController = require('../controller/maker');

const router = Router();

//Get all makers
router.get('/all', passport.authenticate('jwt', { session: false }), makerController.getAllMakers);

module.exports = router;