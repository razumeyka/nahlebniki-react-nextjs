const { Router } = require('express');
const router = Router();
const adminController = require('../controllers/admin');
const filesMiddleware = require('../middleware/files.js');

router.post('/create', filesMiddleware.any(), adminController.createRecipe);

module.exports = router;