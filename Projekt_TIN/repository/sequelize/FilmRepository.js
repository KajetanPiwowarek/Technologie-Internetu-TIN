const Actor = require('../../model/sequelize/Actor');
const Role = require('../../model/sequelize/Role');
const Film = require('../../model/sequelize/Film');

exports.getFilms = () => {
  return Film.findAll();
};

exports.getFilmById = (idFilm) => {
  return Film.findByPk(idFilm,
    {
      include: [{
        model: Role,
        as: 'roles',
        include: [{
          model: Actor,
          as: 'actor'
        }]
      }]
    });
};

exports.createFilm = (newFilmData) => {
  return Film.create({
    filmName: newFilmData.filmName,
    boxOffice: newFilmData.boxOffice,
    releaseDate: newFilmData.releaseDate
  });
};

exports.updateFilm = (idFilm, FilmData) => {
  const filmName = FilmData.filmName;
  const boxOffice = FilmData.boxOffice;
  const releaseDate = FilmData.releaseDate;
  return Film.update(FilmData, {where: {idFilm: idFilm}});
};

exports.deleteFilm = (idFilm) => {
  return Film.destroy({
    where: {idFilm: idFilm}
  });
};