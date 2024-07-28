const express = require('express');
const upload = require('../middlewares/multer')
const antenaController = require('../controllers/antenaController');
const { verifyToken } = require('../middlewares/authMiddleware');

const router = express.Router();

// Rotas para antena
router.post('/',verifyToken,upload, antenaController.createAntena);
router.get('/', verifyToken,antenaController.getAllAntenas);
router.get('/:id',verifyToken,antenaController.getAntenaById);
router.put('/:id',verifyToken, upload, antenaController.updateAntena);
router.delete('/:id',verifyToken,antenaController.deleteAntena);

module.exports = router;
