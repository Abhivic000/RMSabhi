const express = require('express');
const { getSeatAvailability, bookSeat, getBookingDetails } = require('../controller/user.controller');
const { authenticateToken } = require('../middleware/auth.middleware');

const router = express.Router();
router.post('/seat-availability', authenticateToken, getSeatAvailability);
router.post('/book-seat', authenticateToken, bookSeat);
router.get('/booking-details', authenticateToken, getBookingDetails);

module.exports = router;
