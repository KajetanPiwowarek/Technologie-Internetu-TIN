const Sequelize = require('sequelize');

const Actor = require('../../model/sequelize/Actor');
const Role = require('../../model/sequelize/Role');
const Film = require('../../model/sequelize/Film');

exports.getRoles = () => {
  return Role.findAll({include: [
    {
      model: Actor,
      as: 'actor'
    },
    {
      model: Film,
      as: 'film'
    }]
  });
};

exports.getRoleById = (idRole) => {
  return Role.findByPk(idRole, {include: [
    {
      model: Actor,
      as: 'actor'
    },
    {
      model: Film,
      as: 'film'
    }]
  });
};

exports.createRole = (newRoleData) => {
  console.log(JSON.stringify(newRoleData));

  return Role.create({
    idActor: newRoleData.idActor,
    idFilm: newRoleData.idFilm,
    roleName: newRoleData.roleName,
    roleAge: newRoleData.roleAge
  });
};

exports.updateRole = (idRole, roleData) => {
  const idActor = roleData.idActor;
  const idFilm = roleData.lastName;
  const roleName = roleData.roleName;
  const roleAge = roleData.roleAge;
  return Role.update(roleData, {where: {idRole: idRole}});
};

exports.deleteRole = (idRole) => {
  return Role.destroy({
    where: {idRole: idRole}
  });
};

exports.deleteManyRoles = (idRoles) => {
  return Role.find({ idRole: { [Sequelize.Op.in]: idRoles }})
};