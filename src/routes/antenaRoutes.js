const express = require('express');
const antenaController = require('../controllers/antenaController');
const { verifyToken } = require('../middlewares/authMiddleware');

const router = express.Router();

// Rotas para antena
router.post('/',verifyToken,antenaController.createAntena);
router.get('/', verifyToken,antenaController.getAllAntenas);
router.get('/:id',verifyToken,antenaController.getAntenaById);
router.put('/:id',verifyToken,antenaController.updateAntena);
router.delete('/:id',verifyToken,antenaController.deleteAntena);

module.exports = router;
