const express = require('express');
const receptorController = require('../controllers/receptorController');
const { verifyToken } = require('../middlewares/authMiddleware');

const router = express.Router();

// Rotas para antena
router.post('/',verifyToken,receptorController.createReceptor);
router.get('/', verifyToken,receptorController.getAllReceptores);
router.get('/:id',verifyToken,receptorController.getReceptorById);
router.put('/:id',verifyToken,receptorController.updateReceptor);
router.delete('/:id',verifyToken,receptorController.deleteReceptor);

module.exports = router;
