const Maker = require('../models/maker');
const {divideListByProperty} = require('../utils/utils');
exports.getAllMakers = async (req, res, next) => {
  try{
    const makers = await Maker.findAll({raw : true});
    const makersDivded = divideListByProperty(makers, 'position');
    res.status(200).json(makersDivded);
  }catch(err){
    if(!err.statusCode){
      err.statusCode = 500;
    }
    err.message = err;
    next(err);
  }  
}