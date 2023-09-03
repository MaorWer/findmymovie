const { Router } = require('express');
const { body } = require('express-validator');
const passport = require('passport');


const authController = require('../controller/auth');
const User = require('../models/user');

const router = Router();

router.post('/sign-up',
  body('firstName').trim().matches(/^[A-Za-z\s]+$/).isLength({ min: 3 }).withMessage('First name should contain at least 3 characters and must be alphabetic'),
  body('lastName').trim().matches(/^[A-Za-z\s]+$/).optional({ checkFalsy: true, nullable: true }).trim().isLength({ min: 3 }).withMessage('Last name should to contain at least 3 characters and must be alphabetic'),
  body('email').isEmail().normalizeEmail().custom((value) => {
    return User.findOne({
      where: {
        email: value
      }
    })
      .then(user => {
        if (user) {
          return Promise.reject('E-Mail already in use.')
        }
      })
  }),
  body('email').isEmail().normalizeEmail(),
  body('password')
  .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=(?:\D*\d){4})(?=.*[@$#!%*?_&\-])[A-Za-z\d@$#!%*?_&\-]{8,16}$/)
  .withMessage('Password length between 8-16 characters, at least 4 Numbers, One uppercase, One lowercase, One special character.'),
  body('confirmPassword', 'Passwords not match.').custom((value, { req }) => {
    if (value !== req.body.password) {
      return false;
    }
    return true;
  })
  , authController.postSignUp);

router.post('/sign-in',
  body('email').isEmail().normalizeEmail(),
  body('password')
  .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=(?:\D*\d){4})(?=.*[@$#!%*?_&\-])[A-Za-z\d@$#!%*?_&\-]{8,16}$/)
  .withMessage('Password length between 8-16 characters, at least 4 Numbers, One uppercase, One lowercase, One special character.'),
  authController.postLogin);

module.exports = router;