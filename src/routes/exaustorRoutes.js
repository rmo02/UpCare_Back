const express = require('express');
const exaustorController = require('../controllers/exaustorController');
const { verifyToken } = require('../middlewares/authMiddleware');

const router = express.Router();

// Rotas para antena
router.post('/',verifyToken,exaustorController.createExaustor);
router.get('/', verifyToken,exaustorController.getAllExaustores);
router.get('/:id',verifyToken,exaustorController.getExaustorById);
router.put('/:id',verifyToken,exaustorController.updateExaustor);
router.delete('/:id',verifyToken,exaustorController.deleteExaustor);

module.exports = router;
