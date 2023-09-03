const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path =require('path');
const passport = require('passport');
require('./server/config/passport')(passport);

const sequelize = require('./server/config/database');
const app = express();

const movieRoute = require('./server/routes/movie');
const makerRoute = require('./server/routes/maker');
const Movie = require('./server/models/movie')
const authRoute = require('./server/routes/auth');
const contactRoute = require('./server/routes/contact');
const favoritesRoute = require('./server/routes/favorites');
const { initDataMovies } = require('./server/data/movie')
const { initDataMaker } = require('./server/data/maker')
const { initDataUser } = require('./server/data/user')
const { initDataMovieMakers } = require('./server/data/movieMaker')
const Maker = require('./server/models/maker')
const MovieMaker = require('./server/models/movieMaker')
const User = require('./server/models/user');
const UserMovie = require('./server/models/userMovie');

app.use(passport.initialize());
app.use(express.json());
app.use(cors());
app.use(express.static('public'))

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images")
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "_" + Date.now( + path.extname(file.originalname)) + '.' + file.originalname.split('.')[1]);
  }
})

const upload = multer({
  storage: storage
})

app.use('/',movieRoute);
app.use('/makers',makerRoute);
app.use('/auth',authRoute);
app.use('/favorites',favoritesRoute);
app.use('/contact',contactRoute);

app.use((err, req, res, next) => {
  console.log(err)
  res.status(err.statusCode).json({
    message: err.message,
    data: err.data
  });
  next();
})

app.post('/upload', upload.single('image'), (req, res) => {
  const image = req.file.filename
  res.status(200).json({imageId: image});
})

Movie.belongsToMany(User,{through: UserMovie});
Maker.belongsToMany(Movie,{through: MovieMaker});
Movie.belongsToMany(User,{through: UserMovie});





// sample.save();

// const sample2 = Movie.build({
//   title: 'movie2',
//   description: 'this is a decription',
//   category: 'action',
//   year: 1945,
//   duration: 100,
// });

//If u want that sync work you need to create a routes into models 
sequelize.sync({
  force: false
})
.then(async (res) => {
  const makers = await Maker.findAll();
  if(makers.length === 0) initDataMaker();
  const movies = await Movie.findAll();
  if(movies.length === 0) initDataMovies();
  const movieMakers = await MovieMaker.findAll();
  if(movieMakers.length === 0) initDataMovieMakers();
  const users = await User.findAll();
  if(users.length === 0) initDataUser();
  console.log("Database connected!")
  app.listen(3001);
  console.log(`Example app listening at http://localhost:3001`);
})
.catch(err => {
console.log(err)
console.log("Cant connect to database")
})


