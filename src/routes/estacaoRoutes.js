const express = require('express');
const estacaoController = require('../controllers/estacaoController');
const { verifyToken } = require('../middlewares/authMiddleware');
const upload = require('../middlewares/multer');

const router = express.Router();

router.post('/', verifyToken, estacaoController.createEstacao);
router.get('/', verifyToken, estacaoController.getAllEstacoes);
router.get('/:id', verifyToken, estacaoController.getEstacaoById);
router.put('/:id', verifyToken, upload, estacaoController.updateEstacao);
router.delete('/:id', verifyToken, estacaoController.deleteEstacao);

module.exports = router;
