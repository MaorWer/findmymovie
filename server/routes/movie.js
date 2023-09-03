const { Router } = require('express');
const passport = require('passport');

const movieController = require('../controller/movie');

const router = Router();

//Get all Movies
router.get('/movies', movieController.getAllMovies);
//Get all Movies
router.get('/movies/:category', movieController.getAllMoviesByCategory);
//Get Movie By id
router.get('/movie/:id', movieController.getMovieById);
// //Add Movie by Admin
router.post('/movie', passport.authenticate('jwt', { session: false }), movieController.postMovie);
//Remove Movie by Admin
router.post('/movies/delete', passport.authenticate('jwt', { session: false }), movieController.postRemoveMovie);

module.exports = router;