const express = require('express');
const router = express.Router();
const roleController = require('../controllers/roleController');

router.get('/', roleController.showRoleList);
router.get('/add', roleController.showAddRoleForm);
router.get('/edit/:idRole', roleController.showEditRoleForm);
router.get('/details/:idRole', roleController.showRoleDetails);
router.post('/add', roleController.addRole);
router.post('/edit', roleController.updateRole);
router.get('/delete/:idRole', roleController.deleteRole);

module.exports = router;