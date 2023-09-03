const User = require("../models/user");



exports.initDataUser = async () => {
  await User.create({
    firstName: 'Admin',
    email: 'admin@findmymovie.com',
    hash: '07722ab40a64b6b07c4e020cb0b1e05a138c98d502fefe5b882715af2616e932e43f85f11f55665eda04cd3fc57e6227fa623f676f3c6810fe595b9e03c9493d',
    salt: '57b4ee986a3d441f70c4ff93a0619b9ebb63495b2b6b4d409bea556be429f55c',
    admin: true
  });
}

