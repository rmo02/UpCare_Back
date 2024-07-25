const express = require('express');
const nobreakController = require('../controllers/nobreakController');
const { verifyToken } = require('../middlewares/authMiddleware');

const router = express.Router();

// Rotas para antena
router.post('/',verifyToken,nobreakController.createNobreak);
router.get('/', verifyToken,nobreakController.getAllNobreaks);
router.get('/:id',verifyToken,nobreakController.getNobreakById);
router.put('/:id',verifyToken,nobreakController.updateNobreak);
router.delete('/:id',verifyToken,nobreakController.deleteNobreak);

module.exports = router;
