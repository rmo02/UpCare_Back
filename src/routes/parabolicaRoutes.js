const express = require('express');
const parabolicaController = require('../controllers/parabolicaController');
const { verifyToken } = require('../middlewares/authMiddleware');
const upload = require('../middlewares/multer');

const router = express.Router();

// Rotas para antena
router.post('/',verifyToken,parabolicaController.createParabolica);
router.get('/', verifyToken,parabolicaController.getAllParabolicas);
router.get('/:id',verifyToken,parabolicaController.getParabolicaById);
router.put('/:id',verifyToken, upload, parabolicaController.updateParabolica);
router.delete('/:id',verifyToken,parabolicaController.deleteParabolica);

module.exports = router;
