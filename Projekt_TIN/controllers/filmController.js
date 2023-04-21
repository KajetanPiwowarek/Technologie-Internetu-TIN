const FilmRepository = require('../repository/sequelize/FilmRepository');

exports.showFilmList = (req, res, next) => {
  FilmRepository.getFilms()
    .then(films => {
      res.render('pages/film/list', {
        films: films,
        navLocation: 'film'
      });
    });
}

exports.showAddFilmForm = (req, res, next) => {
  res.render('pages/film/form', {
    film: {},
    pageTitle: 'Nowy film',
    formMode: 'createNew',
    btnLabel: 'Dodaj film',
    formAction: '/films/add',
    navLocation: 'film',
    validationErrors: []
  });
}

exports.showEditFilmForm = (req, res, next) => {
  const idFilm = req.params.idFilm;
  FilmRepository.getFilmById(idFilm)
    .then(film => {
      res.render('pages/film/form', {
        film: film,
        pageTitle: 'Edycja filmu',
        formMode: 'edit',
        btnLabel: 'Edytuj film',
        formAction: '/films/edit',
        navLocation: 'film',
        validationErrors: []
      });
    });
}

exports.showFilmDetails = (req, res, next) => {
  const idFilm = req.params.idFilm;
  FilmRepository.getFilmById(idFilm)
    .then(film => {
      res.render('pages/film/form', {
        film: film,
        pageTitle: 'Szczegóły filmu',
        formMode: 'showDetails',
        formAction: '',
        navLocation: 'film',
        validationErrors: []
      });
    });
}

exports.addFilm = (req, res, next) => {
  const filmData = {...req.body};
  FilmRepository.createFilm(filmData)
    .then( result => {
      res.redirect('/films');
    })
    .catch(err => {
      res.render('pages/film/form', {
        film: filmData,
        pageTitle: 'Dodawanie filmu',
        formMode: 'createNew',
        btnLabel: 'Dodaj film',
        formAction: '/films/add',
        navLocation: 'film',
        validationErrors: err.errors
      });
    });
}

exports.updateFilm = (req, res, next) => {
  const idFilm = req.body.idFilm;
  const filmData = {...req.body};
  FilmRepository.updateFilm(idFilm, filmData)
    .then( result => {
      res.redirect('/films');
    })
    .catch(err => {
      FilmRepository.getFilmById(idFilm)
      .then(film => {
        res.render('pages/film/form', {
          film: film,
          pageTitle: 'Edytowanie filmu',
          formMode: 'edit',
          btnLabel: 'Edytuj film',
          formAction: '/films/edit',
          navLocation: 'film',
          validationErrors: err.errors
        });
      });
    });
}

exports.deleteFilm = (req, res, next) => {
  const idFilm = req.params.idFilm;
  FilmRepository.deleteFilm(idFilm)
    .then( result => {
      res.redirect('/films');
    });
}