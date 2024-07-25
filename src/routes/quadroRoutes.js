const express = require('express');
const quadroController = require('../controllers/quadroController');
const { verifyToken } = require('../middlewares/authMiddleware');

const router = express.Router();

// Rotas para antena
router.post('/',verifyToken,quadroController.createQuadro);
router.get('/', verifyToken,quadroController.getAllQuadros);
router.get('/:id',verifyToken,quadroController.getQuadroById);
router.put('/:id',verifyToken,quadroController.updateQuadro);
router.delete('/:id',verifyToken,quadroController.deleteQuadro);

module.exports = router;
