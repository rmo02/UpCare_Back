const express = require('express');
const manutencaoController = require('../controllers/manutencaoController');
const { verifyToken } = require('../middlewares/authMiddleware');

const router = express.Router();

// Rotas para manutencao
router.post('/',verifyToken,manutencaoController.createManutencao);
router.get('/', verifyToken,manutencaoController.getAllManutencoes);
router.get('/:id',verifyToken,manutencaoController.getManutencaoById);
router.put('/:id',verifyToken,manutencaoController.updateManutencao);
router.delete('/:id',verifyToken,manutencaoController.deleteManutencao);

module.exports = router;
