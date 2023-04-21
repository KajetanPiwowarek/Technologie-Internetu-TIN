const FilmRepository = require('../repository/sequelize/FilmRepository');

exports.getFilms = (req, res, next) => {
  FilmRepository.getFilms()
  .then(films => {
    res.status(200).json(films);
  })
  .catch(err => {
    console.log(err);
  });
};

exports.getFilmById = (req, res, next) => {
  const idFilm = req.params.idFilm;
  FilmRepository.getFilmById(idFilm)
  .then(film => {
    if(!film) {
      res.status(404).json({
        message: 'Film with id: ' + idFilm + ' not found.'
      })
    }else {
      res.status(200).json(film);
    }
  });
};

exports.createFilm = (req, res, next) => {
  FilmRepository.createFilm(req.body)
  .then(newObj => {
    res.status(201).json(newObj);
  })
  .catch(err => {
    if(!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  });
};

exports.updateFilm = (req, res, next) => {
  const idFilm = req.params.idFilm;
  FilmRepository.updateFilm(idFilm, req.body)
  .then(result => {
    res.status(200).json({message: 'Film updated!', Film: result});
  })
  .catch(err => {
    if(!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  });
};

exports.deleteFilm = (req, res, next) => {
  const idFilm = req.params.idFilm;
  FilmRepository.deleteFilm(idFilm)
  .then(result => {
    res.status(200).json({message: 'Removed Film!', Film: result});
  })
  .catch(err => {
    if(!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  });
};