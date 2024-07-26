const express = require('express');
const checklistController = require('../controllers/checklistController');
const { verifyToken } = require('../middlewares/authMiddleware');

const router = express.Router();

// Rotas para antena
router.post('/',verifyToken,checklistController.createChecklist);
router.get('/', verifyToken,checklistController.getAllChecklists);
router.get('/:id',verifyToken,checklistController.getChecklistById);
router.put('/:id',verifyToken,checklistController.updateChecklist);
router.delete('/:id',verifyToken,checklistController.deleteChecklist);

module.exports = router;
