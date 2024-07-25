const express = require('express');
const torreController = require('../controllers/torreController');
const { verifyToken } = require('../middlewares/authMiddleware');

const router = express.Router();

// Rotas para antena
router.post('/',verifyToken,torreController.createTorre);
router.get('/', verifyToken,torreController.getAllTorres);
router.get('/:id',verifyToken,torreController.getTorreById);
router.put('/:id',verifyToken,torreController.updateTorre);
router.delete('/:id',verifyToken,torreController.deleteTorre);

module.exports = router;
