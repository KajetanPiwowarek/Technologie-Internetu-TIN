const express = require('express');
const router = express.Router();

const filmApiController = require('../../api/FilmAPI');

router.get('/', filmApiController.getFilms);
router.get('/:idFilm', filmApiController.getFilmById);
router.post('/', filmApiController.createFilm);
router.put('/:idFilm', filmApiController.updateFilm);
router.delete('/:idFilm', filmApiController.deleteFilm);

module.exports = router;