const Actor = require('../../model/sequelize/Actor');
const Role = require('../../model/sequelize/Role');
const Film = require('../../model/sequelize/Film');

exports.getActors = () => {
  return Actor.findAll();
};

exports.getActorById = (idActor) => {
  return Actor.findByPk(idActor,
    {
      include: [{
        model: Role,
        as: 'roles',
        include: [{
          model: Film,
          as: 'film'
        }]
      }]
    });
};

exports.createActor = (newActorData) => {
  return Actor.create({
    firstName: newActorData.firstName,
    lastName: newActorData.lastName,
    birthDate: newActorData.birthDate,
    email: newActorData.email,
    phoneNumber: newActorData.phoneNumber
  });
};

exports.updateActor = (idActor, actorData) => {
  const firstName = actorData.firstName;
  const lastName = actorData.lastName;
  const birthDate = actorData.birthDate;
  const email = actorData.email;
  const phoneNumber = actorData.phoneNumber;
  return Actor.update(actorData, {where: {idActor: idActor}});
};

exports.deleteActor = (idActor) => {
  return Actor.destroy({
    where: {idActor: idActor}
  });
};