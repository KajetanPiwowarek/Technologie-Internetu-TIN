const sequelize = require('./sequelize');

const Actor = require('../../model/sequelize/Actor');
const Role = require('../../model/sequelize/Role');
const Film = require('../../model/sequelize/Film');

module.exports = () => {
  Actor.hasMany(Role, {as: 'roles', foreignKey: {name: 'idActor', allowNull: false}, constraints: true, onDelete: 'CASCADE'});
  Role.belongsTo(Actor, {as: 'actor', foreignKey: {name: 'idActor', allowNull: false}});
  Film.hasMany(Role, {as: 'roles', foreignKey: {name: 'idFilm', allowNull: false}, constraints: true, onDelete: 'CASCADE'});
  Role.belongsTo(Film, {as: 'film', foreignKey: {name: 'idFilm', allowNull: false}});

  let allActors, allFilms;
  return sequelize
    .sync({force: true})
    .then( () => {
      return Actor.findAll();
    })
    .then(actors => {
      if( !actors || actors.length == 0 ){
        return Actor.bulkCreate([
          {firstName: 'Joaquin', lastName: 'Phoenix', birthDate: '1974-10-28', email: 'joaquin.phoenix@gmail.com', phoneNumber: '123-456-789'},
          {firstName: 'Leonardo', lastName: 'DiCaprio', birthDate: '1974-11-11', email: 'leonardo.dicaprio@gmail.com', phoneNumber: ''},
          {firstName: 'Robert', lastName: 'Downey Jr.', birthDate: '1965-04-04', email: 'robert.downey.jr@gmail.com', phoneNumber: ''},
        ])
        .then( () => {
          return Actor.findAll();
        });
      }else {
        return actors;
      }
    })
    .then( actors => {
      allActors = actors;
      return Film.findAll();
    })
    .then(films => {
      if( !films || films.length == 0 ){
        return Film.bulkCreate([
          {filmName: 'Joker', boxOffice: '1074000000', releaseDate: '2019-10-04'},
          {filmName: 'Titanic', boxOffice: '200000000', releaseDate: '1997-12-19'},
          {filmName: 'Iron Man', boxOffice: '140000000', releaseDate: '2008-04-30'},
          {filmName: 'Gladiator', boxOffice: '460500000', releaseDate: '2000-07-14'},
          {filmName: 'Mistrz', boxOffice: '28300000', releaseDate: '2012-11-16'},
        ])
        .then( () => {
          return Film.findAll();
        });
      }else {
        return films;
      }
    })
    .then( films => {
      allFilms = films;
      return Role.findAll();
    })
    .then(roles => {
      if( !roles || roles.length == 0 ){
        return Role.bulkCreate([
          {idActor: allActors[0].idActor, idFilm: allFilms[0].idFilm, roleName: 'Joker', roleAge: 33},
          {idActor: allActors[0].idActor, idFilm: allFilms[3].idFilm, roleName: 'Kommodus', roleAge: 42},
          {idActor: allActors[0].idActor, idFilm: allFilms[4].idFilm, roleName: 'Freddie Quell', roleAge: 35},
        ]);
      }else {
        return films;
      }
    })
}