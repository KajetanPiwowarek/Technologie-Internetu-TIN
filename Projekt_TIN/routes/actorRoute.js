const express = require('express');
const router = express.Router();
const actorController = require('../controllers/actorController');

router.get('/', actorController.showActorList);
router.get('/add', actorController.showAddActorForm);
router.get('/edit/:idActor', actorController.showEditActorForm);
router.get('/details/:idActor', actorController.showActorDetails);
router.post('/add', actorController.addActor);
router.post('/edit', actorController.updateActor);
router.get('/delete/:idActor', actorController.deleteActor);

module.exports = router;