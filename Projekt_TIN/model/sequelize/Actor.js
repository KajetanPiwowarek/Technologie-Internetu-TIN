const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const Actor = sequelize.define('Actor', {
  idActor: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  firstName: {
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
  lastName: {
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
  birthDate: {
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
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: {
      msg: "Podany adres email jest już używany"
    },
    validate: {
      notEmpty: {
        msg: "Pole jest wymagane"
      },
      len: {
        args: [5,60],
        msg: "Pole powinno zawierać od 5 do 60 znaków"
      },
      isEmail: {
        msg: "Pole powinno zawierać prawidłowy adres email"
      },
    },
  },
  phoneNumber: {
    type: Sequelize.STRING,
    allowNull: true,
    validate: {
      is: {
        args: "^$|^[0-9]{3}-[0-9]{3}-[0-9]{3}$",
        msg: "Numer telefonu powinnien mieć format xxx-xxx-xxx"
      },
    },
  }
});

module.exports = Actor;