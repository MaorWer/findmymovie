const Contact = require('../models/contact');

exports.postContact = async (req, res, next) => {
  try{
    const name = req.body.name;
    const email = req.body.email;
    const message = req.body.message;

    await Contact.create({
      name,
      email,
      message
    })
    res.status(200).json({success: true});
    
  }catch(err){
    res.status(400).json();

    if(!err.statusCode){
      err.statusCode = 500;
    }
    err.message = err;
    console.log(err)
    next(err);
  }
}

exports.getAllContacts = async (req, res, next) => {
  try {
    const data = await Contact.findAll({raw : true});
    res.status(200).json(data);

  }catch(err){
    if(!err.statusCode){
      err.statusCode = 500;
    }
    err.message = err;
    next(err);
  }
}

exports.postRemoveContact = async (req, res, next) => {
  try{
    const id = req.body.id
    await Contact.destroy({ where: { id } })
    res.status(200).json({message: 'Delete contact succeded.'});
  }catch(err) {
    if(!err.statusCode){
      err.statusCode = 500;
    }
    err.message = err;
    next(err);
  }
}