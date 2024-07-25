const express = require('express');
const caboController = require('../controllers/caboController');
const { verifyToken } = require('../middlewares/authMiddleware');

const router = express.Router();

// Rotas para cabo
router.post('/',verifyToken,caboController.createCabo);
router.get('/', verifyToken,caboController.getAllCabos);
router.get('/:id',verifyToken,caboController.getCaboById);
router.put('/:id',verifyToken,caboController.updateCabo);
router.delete('/:id',verifyToken,caboController.deleteCabo);

module.exports = router;
