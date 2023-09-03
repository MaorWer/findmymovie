const Movie = require('../models/movie');
const UserMovie = require('../models/userMovie');
const {getUserMoviesListData, divideListByCategory, divideListByProperty} = require('../utils/utils.js');

exports.getAllUserFavorites = async (req, res, next) => {
  try {
    const idUser = req.query.idUser;
    const category = req.query.category;
    const type = req.query.type;
    const allMovies = await Movie.findAll({raw : true});
    const userMovies = await UserMovie.findAll({where: {idUser}, raw : true});
    if(allMovies != undefined || allMovies.length != 0){
      const movies = getUserMoviesListData(allMovies, userMovies)
      if(category == "all"){
        res.status(200).json(movies);
      }else{
        res.status(200).json(divideListByProperty(movies, type)[category]);
      }
    }else{
      res.status(404).json({message: 'Not found movies please added to see some.'});
    }
  }catch(err){
    if(!err.statusCode){
      err.statusCode = 500;
    }
    err.message = err;
    next(err);
  }
}

exports.getUserFilterData = async (req, res, next) => {
  try {
    const idUser = req.query.idUser;
    const allMovies = await Movie.findAll({raw : true});
    const userMovies = await UserMovie.findAll({where: {idUser}, raw : true});
    if(allMovies != undefined || allMovies.length != 0){
      const movies = getUserMoviesListData(allMovies, userMovies)
      const category = [
        "all",
        ...Object.keys(divideListByProperty(movies, "category"))
      ];
      const year = [
        "all",
        ...Object.keys(divideListByProperty(movies, "year"))
      ];
      res.status(200).json({year, category});
    }else{
      res.status(404).json({message: 'Not found movies please added to see some.'});
    }
  }catch(err){
    if(!err.statusCode){
      err.statusCode = 500;
    }
    err.message = err;
    next(err);
  }
}

exports.addMovieToUserFavorites = (req, res, next) => {
  const idMovie = req.body.idMovie;
  const idUser = req.body.idUser;
  UserMovie.create({
    idMovie,
    idUser
  })
  .then(data => {
    res.status(200).json({message: 'Movie added to user favorite list!', data, status: 200});
  })
  .catch(err => {
    if(!err.statusCode){
      err.statusCode = 500;
    }
    err.message = err;
    console.log(err)
    next(err);
  })
}

exports.postRemoveUserFavorites = async (req, res, next) => {
  try {
    const idMovie = req.body.idMovie;
    const idUser = req.body.idUser;
    const movie = await UserMovie.destroy({ where: { idMovie, idUser } })

    if(!movie){
      return res.status(404).json({message: 'Not Movie Found yet.'});
    }
    
    res.status(200).json({message: 'Delete Movies succeded.', status: 200});
    
  }catch(err){
    if(!err.statusCode){
      err.statusCode = 500;
    }
    err.message = err;
    next(err);
  }
}