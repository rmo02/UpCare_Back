const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middlewares/authMiddleware');

const equipamentosController = require('../controllers/equipamentosController');

// Rota para buscar todos os equipamentos sem incluir as estações
router.get('/', verifyToken, equipamentosController.getAllEquipamentos);

module.exports = router;
