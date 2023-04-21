const ActorRepository = require('../repository/sequelize/ActorRepository');

exports.showActorList = (req, res, next) => {
  ActorRepository.getActors()
    .then(actors => {
      res.render('pages/actor/list', {
        actors: actors,
        navLocation: 'actor'
      });
    });
}

exports.showAddActorForm = (req, res, next) => {
  res.render('pages/actor/form', {
    actor: {},
    pageTitle: 'Nowy aktor',
    formMode: 'createNew',
    btnLabel: 'Dodaj aktora',
    formAction: '/actors/add',
    navLocation: 'actor',
    validationErrors: []
  });
}

exports.showEditActorForm = (req, res, next) => {
  const idActor = req.params.idActor;
  ActorRepository.getActorById(idActor)
    .then(actor => {
      res.render('pages/actor/form', {
        actor: actor,
        pageTitle: 'Edycja aktora',
        formMode: 'edit',
        btnLabel: 'Edytuj aktora',
        formAction: '/actors/edit',
        navLocation: 'actor',
        validationErrors: []
      });
    });
}

exports.showActorDetails = (req, res, next) => {
  const idActor = req.params.idActor;
  ActorRepository.getActorById(idActor)
    .then(actor => {
      res.render('pages/actor/form', {
        actor: actor,
        pageTitle: 'Szczegóły aktora',
        formMode: 'showDetails',
        formAction: '',
        navLocation: 'actor',
        validationErrors: []
      });
    });
}

exports.addActor = (req, res, next) => {
  const actorData = {...req.body};
  ActorRepository.createActor(actorData)
    .then( result => {
      res.redirect('/actors');
    })
    .catch(err => {
      res.render('pages/actor/form', {
        actor: actorData,
        pageTitle: 'Dodawanie aktora',
        formMode: 'createNew',
        btnLabel: 'Dodaj aktora',
        formAction: '/actors/add',
        navLocation: 'actor',
        validationErrors: err.errors
      });
    });
}

exports.updateActor = (req, res, next) => {
  const idActor = req.body.idActor;
  const actorData = {...req.body};
  ActorRepository.updateActor(idActor, actorData)
    .then( result => {
      res.redirect('/actors');
    })
    .catch(err => {
      ActorRepository.getActorById(idActor)
      .then(actor => {
        res.render('pages/actor/form', {
          actor: actor,
          pageTitle: 'Edytowanie aktora',
          formMode: 'edit',
          btnLabel: 'Edytuj aktora',
          formAction: '/actors/edit',
          navLocation: 'actor',
          validationErrors: err.errors
        });
      });
    });
}

exports.deleteActor = (req, res, next) => {
  const idActor = req.params.idActor;
  ActorRepository.deleteActor(idActor)
    .then( result => {
      res.redirect('/actors');
    });
}