const Movie = require("../models/movie");
const data = require('./movie.json');

exports.initDataMovies = async () => {
  Object.keys(data).forEach(async value => {
    await Movie.create(data[value]);
  })
}

