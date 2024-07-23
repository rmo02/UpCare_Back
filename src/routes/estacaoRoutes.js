const express = require('express');
const estacaoController = require('../controllers/estacaoController');
const { verifyToken } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', verifyToken, estacaoController.createEstacao);
router.get('/', verifyToken, estacaoController.getAllEstacoes);
router.get('/:id', verifyToken, estacaoController.getEstacaoById);
router.put('/:id', verifyToken, estacaoController.updateEstacao);
router.delete('/:id', verifyToken, estacaoController.deleteEstacao);

module.exports = router;
