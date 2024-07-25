const express = require('express');
const combinadorController = require('../controllers/combinadorController');
const { verifyToken } = require('../middlewares/authMiddleware');

const router = express.Router();

// Rotas para conbinador
router.post('/',verifyToken,combinadorController.createCombinador);
router.get('/', verifyToken,combinadorController.getAllCombinadores);
router.get('/:id',verifyToken,combinadorController.getCombinadorById);
router.put('/:id',verifyToken,combinadorController.updateCombinador);
router.delete('/:id',verifyToken,combinadorController.deleteCombinador);

module.exports = router;
