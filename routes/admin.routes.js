const express = require('express');
const { addTrain } = require('../controller/admin.controller');
const { authenticateToken, adminOnly } = require('../middleware/auth.middleware');

const router = express.Router();
router.post('/add-train', authenticateToken, adminOnly, addTrain);

module.exports = router;
