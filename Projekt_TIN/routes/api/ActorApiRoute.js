const express = require('express');
const router = express.Router();

const actorApiController = require('../../api/ActorAPI');

router.get('/', actorApiController.getActors);
router.get('/:idActor', actorApiController.getActorById);
router.post('/', actorApiController.createActor);
router.put('/:idActor', actorApiController.updateActor);
router.delete('/:idActor', actorApiController.deleteActor);

module.exports = router;