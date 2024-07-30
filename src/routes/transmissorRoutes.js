const express = require('express');
const transmissorController = require('../controllers/transmissorController');
const { verifyToken } = require('../middlewares/authMiddleware');
const upload = require('../middlewares/multer');

const router = express.Router();

// Rotas para antena
router.post('/',verifyToken,transmissorController.createTransmissor);
router.get('/', verifyToken,transmissorController.getAllTransmissores);
router.get('/:id',verifyToken,transmissorController.getTransmissorById);
router.put('/:id',verifyToken, upload, transmissorController.updateTransmissor);
router.delete('/:id',verifyToken,transmissorController.deleteTransmissor);

module.exports = router;
