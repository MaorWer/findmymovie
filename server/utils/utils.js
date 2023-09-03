const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

exports.genPassword =  (passowrd) => {
  const salt =  crypto.randomBytes(32).toString('hex');
  const hash =  crypto.pbkdf2Sync(passowrd, salt, 10000, 64, 'sha512').toString('hex');

  return {
    salt: salt,
    hash: hash
  }
}

exports.checkPassword =  (password, hash, salt) => {
  const verifyHash =  crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
  return hash === verifyHash;
} 

exports.issueJWT = (user) => {
  const id = user.id;
  const firstName = user.firstName;
  const lastName = user.lastName;
  const admin = user.admin;
  const expiresIn = '4h';

  const pathToPrivateKey = path.join(__dirname, 'keys', 'id_rsa_priv.pem');
  const PRIV_KEY = fs.readFileSync(pathToPrivateKey, 'utf-8');

  const payload = {
    id,
    firstName,
    lastName,
    admin
  };

  const signToken = jwt.sign(payload, PRIV_KEY, { expiresIn: expiresIn, algorithm: 'RS256' });
  return {
    token: "Bearer " + signToken,
    expires: expiresIn
  }
}

exports.divideListByProperty = (arr, prop) => {
  var grouped = {};
  for (var i=0; i<arr.length; i++) {
    var p = arr[i][prop];
    if (!grouped[p]) { grouped[p] = []; }
    grouped[p].push(arr[i]);
  }
  return grouped;
}

exports.divideListByCategory = (arr, prop) => {
  var grouped = {};
  for (var i=0; i<arr.length; i++) {
    var p = arr[i][prop];
    if (!grouped[p]) { grouped[p] = []; }
    grouped[p].push(arr[i]);
  }
  return {
    action: grouped.action === undefined ? [] : grouped.action,
    comedy: grouped.comedy === undefined ? [] : grouped.comedy,
    horror: grouped.horror === undefined ? [] : grouped.horror
  };
}

exports.divideListByMakers = (arr, prop) => {
  var grouped = {};
  for (var i=0; i<arr.length; i++) {
    var p = arr[i][prop];
    if (!grouped[p]) { grouped[p] = []; }
    grouped[p].push(arr[i]);
  }
  return {
    writer: grouped.writer === undefined ? [] : grouped.writer,
    director: grouped.director === undefined ? [] : grouped.director,
    star: grouped.star === undefined ? [] : grouped.star
  };
}

exports.compareUserMoviesWithAllMoviesList = (allMovies, userMovies) => {
  const movies = allMovies.map(value => { return { ...value, isFavorite: false }})
  userMovies.forEach(userMovie => { 
    movies.forEach((movie, index) => {
      if(userMovie.idMovie == movie.id){
        movies[index].isFavorite = true;
      }
    })
  });
  return movies;
}

exports.getUserMoviesListData = (allMovies, userMovies) => {
  const movies = [];
  userMovies.forEach(userMovie => { 
    allMovies.forEach((movie, index) => {
      if(userMovie.idMovie == movie.id){
        movies.push(movie)
      }
    })
  });
  return movies;
}