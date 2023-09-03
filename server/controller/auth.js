const { validationResult } = require('express-validator');

const utils = require('../utils/utils');
const User = require('../models/user');

exports.postSignUp = (req, res, next) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    const error = new Error('Validation failed.');
    error.data = errors.array();
    error.statusCode = 422;
    throw error;
  }
  const hashedPass = utils.genPassword(req.body.password);
  
  User.create({
      name: req.body.name, 
      firstName: req.body.firstName, 
      lastName: req.body.lastName, 
      email: req.body.email, 
      hash: hashedPass.hash,   
      salt: hashedPass.salt   
    })
    .then(user => {
      res.status(200).json({idUser: user.id, status: 200})
    })
    .catch(err => {
      if(!err.statusCode){
        err.statusCode = 500;
      }
      err.message = err;
      next(err);
    })
}

exports.postLogin = (req, res, next) => {
  const errors = validationResult(req);
  let currentUser;
  if(!errors.isEmpty()){
    const error = new Error('Validation failed.');
    error.data = errors.array();
    error.statusCode = 422;
    throw error;
  }
  User.findOne({
    where:{
      email: req.body.email
    }
  })
  .then(user => {
    currentUser = user;

    if(!user){
      res.status(404).json({data: [{path: "email", msg: 'E-Mail not found.'}]});
    }
    const isVaild = utils.checkPassword(req.body.password, user.hash, user.salt);
      if(!isVaild){
        res.status(401).json({data: [{path: "password", msg: 'Password invalid.'}]});
      }
      const jwt = utils.issueJWT(currentUser);
      res.status(200).json({ isAdmin: currentUser.admin, idUser: currentUser.id , token: jwt.token, expiresIn: jwt.expires, status: 200 })
    })
  .catch(err => {
    if(!err.statusCode){
      err.statusCode = 500;
    }
    err.message = err;
    next(err);
  })
}
