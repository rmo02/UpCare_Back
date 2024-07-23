const express = require('express');
const arcondicionadoController = require('../controllers/arcondicionadoController');
const { verifyToken } = require('../middlewares/authMiddleware');

const router = express.Router();

// Rotas para ar-condicionado
router.post('/',verifyToken, arcondicionadoController.createArcondicionado);
router.get('/', verifyToken, arcondicionadoController.getAllArcondicionados);
router.get('/:id',verifyToken, arcondicionadoController.getArcondicionadoById);
router.put('/:id',verifyToken, arcondicionadoController.updateArcondicionado);
router.delete('/:id',verifyToken, arcondicionadoController.deleteArcondicionado);

module.exports = router;
