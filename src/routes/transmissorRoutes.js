const express = require('express');
const transmissorController = require('../controllers/transmissorController');
const { verifyToken } = require('../middlewares/authMiddleware');

const router = express.Router();

// Rotas para antena
router.post('/',verifyToken,transmissorController.createTransmissor);
router.get('/', verifyToken,transmissorController.getAllTransmissores);
router.get('/:id',verifyToken,transmissorController.getTransmissorById);
router.put('/:id',verifyToken,transmissorController.updateTransmissor);
router.delete('/:id',verifyToken,transmissorController.deleteTransmissor);

module.exports = router;
