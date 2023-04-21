const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const Film = sequelize.define('Film', {
  idFilm: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  filmName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "Pole jest wymagane"
      },
      len: {
        args: [2,30],
        msg: "Pole powinno zawierać od 2 do 30 znaków"
      },
    },
  },
  boxOffice: {
    type: Sequelize.FLOAT,
    allowNull: true,
    validate: {
      is: {
        args: "^$|^[1-9]$|^[1-9][0-9]{1,9}$",
        msg: "Pole powinno zawierać liczbę (1-1_000_000_000)"
      },
    },
  },
  releaseDate: {
    type: Sequelize.DATE,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "Pole jest wymagane"
      },
      isDate: {
        msg: "Pole powinno zawierać prawidłową datę"
      },
    },
  }
});

module.exports = Film;