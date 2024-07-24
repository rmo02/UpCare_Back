const express = require('express');
const dpsController = require('../controllers/dpsController');
const { verifyToken } = require('../middlewares/authMiddleware');

const router = express.Router();

// Rotas para disjuntor
router.post('/',verifyToken, dpsController.createDps);
router.get('/', verifyToken, dpsController.getAllDps);
router.get('/:id',verifyToken, dpsController.getDpsById);
router.put('/:id',verifyToken, dpsController.updateDps);
router.delete('/:id',verifyToken, dpsController.deleteDps);

module.exports = router;
