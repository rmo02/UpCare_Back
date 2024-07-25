const express = require('express');
const switchController = require('../controllers/switchController');
const { verifyToken } = require('../middlewares/authMiddleware');

const router = express.Router();

// Rotas para antena
router.post('/',verifyToken,switchController.createSwitch);
router.get('/', verifyToken,switchController.getAllSwitches);
router.get('/:id',verifyToken,switchController.getSwitchById);
router.put('/:id',verifyToken,switchController.updateSwitch);
router.delete('/:id',verifyToken,switchController.deleteSwitch);

module.exports = router;
