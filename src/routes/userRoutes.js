const express = require('express');
const router = express.Router();
const { getAllUsers, getUserById, updateUser, deleteUser } = require('../controllers/userController');
const { verifyToken, isAdmin } = require('../middlewares/authMiddleware');

router.get('/users', verifyToken, isAdmin, getAllUsers);
router.get('/users/:id', verifyToken, getUserById); 
router.put('/users/:id', verifyToken, updateUser); 
router.delete('/users/:id', verifyToken, isAdmin, deleteUser);

module.exports = router;
