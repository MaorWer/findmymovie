const path = require('path');
const fs = require('fs');

const {ExtractJwt, Strategy} = require('passport-jwt');
const User = require('../models/user');

const pathToKey = path.join(__dirname,'..','utils','keys','id_rsa_pub.pem');
const PUB_KEY = fs.readFileSync(pathToKey, 'utf-8');

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: PUB_KEY,
  algorithms: ['RS256'] 
}

const strategy = new Strategy(options, (payload, done) => {
  User.findOne({
    where: {
      id: payload.id
    }
  })
  .then(user => {
    if(!user){
      return done(null,false);
    }
    return done(null,user);
  })
  .catch(err => {
    done(err);
  })
})

module.exports = (passport) => {
  passport.use(strategy);
}

