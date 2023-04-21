const express = require('express');
const router = express.Router();

const roleApiController = require('../../api/RoleAPI');

router.get('/', roleApiController.getRoles);
router.get('/:idRole', roleApiController.getRoleById);
router.post('/', roleApiController.createRole);
router.put('/:idRole', roleApiController.updateRole);
router.delete('/:idRole', roleApiController.deleteRole);

module.exports = router;