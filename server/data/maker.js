const Maker = require("../models/maker");
const data = require('./makers.json');

exports.initDataMaker = async () => {
  Object.keys(data).forEach(async value => {
    await Maker.create(data[value]);
  })
}

