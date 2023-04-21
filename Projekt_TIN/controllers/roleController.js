const RoleRepository = require('../repository/sequelize/RoleRepository');
const ActorRepository = require('../repository/sequelize/ActorRepository');
const FilmRepository = require('../repository/sequelize/FilmRepository');

exports.showRoleList = (req, res, next) => {
  RoleRepository.getRoles()
    .then(roles => {
      res.render('pages/role/list', {
        roles: roles,
        navLocation: 'role'
      });
    });
}

exports.showAddRoleForm = (req, res, next) => {
  let allActors, allFilms;
  ActorRepository.getActors()
    .then(actors => {
      allActors = actors;
      return FilmRepository.getFilms();
    })
    .then(films => {
      allFilms = films;
      res.render('pages/role/form', {
        role: {},
        formMode: 'createNew',
        allActors: allActors,
        allFilms: allFilms,
        pageTitle: 'Nowe role',
        btnLabel: 'Dodaj role',
        formAction: '/roles/add',
        navLocation: 'role',
        validationErrors: []
      });
    });
}

exports.showEditRoleForm = (req, res, next) => {
  const idRole = req.params.idRole;
  let allActors, allFilms;
  ActorRepository.getActors()
    .then(actors => {
      allActors = actors;
      return FilmRepository.getFilms();
    })
    .then(films => {
      allFilms = films;
      return RoleRepository.getRoleById(idRole);
    })
    .then(role => {
      res.render('pages/role/form', {
        role: role,
        allActors: allActors,
        allFilms: allFilms,
        pageTitle: 'Edycja roli',
        formMode: 'edit',
        btnLabel: 'Edytuj role',
        formAction: '/roles/edit',
        navLocation: 'role',
        validationErrors: []
      });
    });
}

exports.showRoleDetails = (req, res, next) => {
  const idRole = req.params.idRole;
  let allActors, allFilms;
  ActorRepository.getActors()
    .then(actors => {
      allActors = actors;
      return FilmRepository.getFilms();
    })
    .then(films => {
      allFilms = films;
      return RoleRepository.getRoleById(idRole);
    })
    .then(role => {
      res.render('pages/role/form', {
        role: role,
        allActors: allActors,
        allFilms: allFilms,
        pageTitle: 'Szczegóły roli',
        formMode: 'showDetails',
        formAction: '',
        navLocation: 'role',
        validationErrors: []
      });
    });
}

exports.addRole = (req, res, next) => {
  const roleData = {...req.body};
  RoleRepository.createRole(roleData)
    .then( result => {
      res.redirect('/roles');
    })
    .catch(err => {
      let allActors, allFilms;
      ActorRepository.getActors()
      .then(actors => {
        allActors = actors;
        return FilmRepository.getFilms();
      })
      .then(films => {
        allFilms = films;
        res.render('pages/role/form', {
          role: roleData,
          formMode: 'createNew',
          allActors: allActors,
          allFilms: allFilms,
          pageTitle: 'Dodawanie roli',
          btnLabel: 'Dodaj role',
          formAction: '/roles/add',
          navLocation: 'role',
          validationErrors: err.errors
        });
      });
    });
}

exports.updateRole = (req, res, next) => {
  const idRole = req.body.idRole;
  const roleData = {...req.body};
  RoleRepository.updateRole(idRole, roleData)
    .then( result => {
      res.redirect('/roles');
    })
    .catch(err => {
      let allActors, allFilms;
      ActorRepository.getActors()
      .then(actors => {
        allActors = actors;
        return FilmRepository.getFilms();
      })
      .then(films => {
        allFilms = films;
        return RoleRepository.getRoleById(idRole);
      })
      .then(role => {
        res.render('pages/role/form', {
          role: role,
          allActors: allActors,
          allFilms: allFilms,
          pageTitle: 'Edycja roli',
          formMode: 'edit',
          btnLabel: 'Edytuj role',
          formAction: '/roles/edit',
          navLocation: 'role',
          validationErrors: err.errors
        });
      });
    });
}

exports.deleteRole = (req, res, next) => {
  const idRole = req.params.idRole;
  RoleRepository.deleteRole(idRole)
    .then( result => {
      res.redirect('/roles');
    });
}