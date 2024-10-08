const express = require('express');
const telemetriaController = require('../controllers/telemetriaController');
const { verifyToken } = require('../middlewares/authMiddleware');
const upload = require('../middlewares/multer');

const router = express.Router();

// Rotas para antena
router.post('/',verifyToken,telemetriaController.createTelemetria);
router.get('/', verifyToken,telemetriaController.getAllTelemetrias);
router.get('/:id',verifyToken,telemetriaController.getTelemetriaById);
router.put('/:id',verifyToken, upload, telemetriaController.updateTelemetria);
router.delete('/:id',verifyToken,telemetriaController.deleteTelemetria);

module.exports = router;
