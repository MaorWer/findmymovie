const { Router } = require('express');
const { body } = require('express-validator');
const passport = require('passport');
const contactController = require('../controller/contact');

const router = Router();

//Create contact message
router.post('/',
  body('name').trim().matches(/^[A-Za-z\s]+$/).isLength({ min: 4, max: 30 }).withMessage('Name should contain between 4-20 characters and must be alphabetic'),
  body('message').trim().isLength({ min: 6 }).withMessage('Message should contain at least 6 characters'),
  body('email').isEmail().normalizeEmail()
,contactController.postContact);
//Remove contact message
router.post('/delete', passport.authenticate('jwt', { session: false }), contactController.postRemoveContact);
//Get all contact list
router.get('/', passport.authenticate('jwt', { session: false }), contactController.getAllContacts);


module.exports = router;