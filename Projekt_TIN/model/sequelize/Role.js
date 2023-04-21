const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const Role = sequelize.define('Role', {
  idRole: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  roleName: {
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
  roleAge: {
    type: Sequelize.INTEGER,
    allowNull: true,
    validate: {
      is: {
        args: "^$|^[1-9]{1,}$",
        msg: "Pole powinno zawierać liczbę (>=1)"
      },
    },
  },
  idFilm: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "Pole jest wymagane"
      },
    },
  },
  idActor: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      selectValidator(value){
        if(value == ""){
          throw new Error("Pole jest wyamgane")
        }
      }
    },
  }
});

module.exports = Role;