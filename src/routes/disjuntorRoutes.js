const express = require('express');
const disjuntorController = require('../controllers/disjuntorController');
const { verifyToken } = require('../middlewares/authMiddleware');
const upload = require('../middlewares/multer');

const router = express.Router();

// Rotas para disjuntor
router.post('/',verifyToken, disjuntorController.createDisjuntor);
router.get('/', verifyToken, disjuntorController.getAllDisjuntores);
router.get('/:id',verifyToken, disjuntorController.getDisjuntorById);
router.put('/:id',verifyToken, upload, disjuntorController.updateDisjuntor);
router.delete('/:id',verifyToken, disjuntorController.deleteDisjuntor);

module.exports = router;
