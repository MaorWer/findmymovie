const passport = require('passport');
const { Router } = require('express');

const favoritesController = require('../controller/favorites');

const router = Router();
//Get all favorite user movies
router.get('/', passport.authenticate('jwt', { session: false }), favoritesController.getAllUserFavorites);
//Get all favorite user movies filters data
router.get('/filter', passport.authenticate('jwt', { session: false }), favoritesController.getUserFilterData);
//Add movie to a user favorite
router.post('/', passport.authenticate('jwt', { session: false }), favoritesController.addMovieToUserFavorites);
//Remove Movie from user favorites
router.post('/delete', passport.authenticate('jwt', { session: false }), favoritesController.postRemoveUserFavorites);

module.exports = router;