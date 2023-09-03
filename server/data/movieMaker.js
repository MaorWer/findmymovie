const MovieMaker = require("../models/movieMaker");
const data = require('./movieMaker.json');

exports.initDataMovieMakers = async () => {
  Object.keys(data).forEach(async value => {
    await MovieMaker.create(data[value]);
  })
}

