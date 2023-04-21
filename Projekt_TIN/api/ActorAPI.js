const ActorRepository = require('../repository/sequelize/ActorRepository');

exports.getActors = (req, res, next) => {
  ActorRepository.getActors()
  .then(actors => {
    res.status(200).json(actors);
  })
  .catch(err => {
    console.log(err);
  });
};

exports.getActorById = (req, res, next) => {
  const idActor = req.params.idActor;
  ActorRepository.getActorById(idActor)
  .then(actor => {
    if(!actor) {
      res.status(404).json({
        message: 'Actor with id: ' + idActor + ' not found.'
      })
    }else {
      res.status(200).json(actor);
    }
  });
};

exports.createActor = (req, res, next) => {
  ActorRepository.createActor(req.body)
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

exports.updateActor = (req, res, next) => {
  const idActor = req.params.idActor;
  ActorRepository.updateActor(idActor, req.body)
  .then(result => {
    res.status(200).json({message: 'Actor updated!', actor: result});
  })
  .catch(err => {
    if(!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  });
};

exports.deleteActor = (req, res, next) => {
  const idActor = req.params.idActor;
  ActorRepository.deleteActor(idActor)
  .then(result => {
    res.status(200).json({message: 'Removed actor!', actor: result});
  })
  .catch(err => {
    if(!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  });
};