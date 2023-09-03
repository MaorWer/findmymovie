const Movie = require('../models/movie');
const Maker = require('../models/maker');
const MovieMaker = require('../models/movieMaker');
const UserMovie = require('../models/userMovie');
const {divideListByCategory, compareUserMoviesWithAllMoviesList, divideListByMakers} = require('../utils/utils.js');

exports.getAllMoviesByCategory = async (req, res, next) => {
  try{
    const category = req.params.category;
    const idUser = req.query.idUser;
    const userMovies = await UserMovie.findAll({where: {idUser}, raw : true});
    const moviesFiltered = await Movie.findAll({ where: { category }, raw : true });
    if(moviesFiltered != undefined || moviesFiltered.length != 0){
      const movies = compareUserMoviesWithAllMoviesList(moviesFiltered, userMovies)
      res.status(200).json(movies);
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


exports.getMovieById = async (req, res, next) => {
  try{
    const idMovie = req.params.id;
    const idUser = req.query.idUser;
    const movie = await Movie.findByPk(idMovie, { raw: true})
    if(!movie){
      res.status(404).json({message: 'Movie not found.'});
    }
    const movieMaker = await MovieMaker.findAll({ where: { idMovie }, raw: true })
    const userMovie = await UserMovie.findAll({where: { idUser, idMovie }, raw : true });
    movie.isFavorite = false;
    if(userMovie.length != 0){
      movie.isFavorite = true;
    }
    const makers = [];
    movieMaker.forEach(async (value, index) => {
      makers.push(await Maker.findByPk(value.idMaker, { raw: true }))
      if(index == movieMaker.length - 1){
        res.status(200).json({
          ...movie,
          ...divideListByMakers(makers, 'position')
        });
      }
    })
  }catch(err){
    if(!err.statusCode){
      err.statusCode = 500;
    }
    err.message = err;
    next(err);
  }
}

exports.getAllMovies = async (req, res, next) => {
  try {
    const idUser = req.query.idUser;
    const disabledFiltered = req.query.disabledFiltered;
    const search = req.query.search;
    const allMovies = await Movie.findAll({raw : true});
    const userMovies = await UserMovie.findAll({where: {idUser}, raw : true});
    if(allMovies != undefined || allMovies.length != 0){
      let movies = compareUserMoviesWithAllMoviesList(allMovies, userMovies)
      if(search !== undefined && search !== ""){
        movies = movies.filter(value => value.title.toLowerCase().includes(search.toLowerCase()))
      }
      if(disabledFiltered){
        res.status(200).json(movies);
      }else{
        res.status(200).json(divideListByCategory(movies, 'category'));
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

exports.postMovie = (req, res, next) => {
  const name = req.body.name;
  const description = req.body.description;
  const category = req.body.category;
  const year = req.body.year;
  const duration = req.body.duration;
  const imageId = req.body.imageId;
  const writersId = req.body.writersId;
  const directorsId = req.body.directorsId;
  const starsId = req.body.starsId;

  Movie.create({
    title: name,
    description,
    category,
    year,
    imageId,
    duration
  })
  .then(movie => {
    const movieMakerList = writersId.concat(directorsId, starsId);
    movieMakerList.map(value => MovieMaker.create({
      idMovie: movie.dataValues.id,
      idMaker: value
    }))
    res.status(200).json({message: 'Movie created!', data: movie});
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

exports.postRemoveMovie = (req, res, next) => {
  const ids = req.body.ids
  ids.forEach((value, index) => {
    Movie.destroy({
      where: {
        id: value
      }
    })
    .then(movie => {
      if(!movie){
        res.status(404).json({message: 'Not Movie Found yet.'});
      }
      if(index == ids.length - 1){
        res.status(200).json({message: 'Delete Movies succeded.'});
      }
    })
    .catch(err => {
      if(!err.statusCode){
        err.statusCode = 500;
      }
      err.message = err;
      next(err);
    })
  })
}