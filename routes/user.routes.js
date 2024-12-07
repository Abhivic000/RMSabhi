const express = require('express');
const { getSeatAvailability, bookSeat, getBookingDetails } = require('../controller/user.controller');
const { authenticateToken } = require('../middleware/auth.middleware');

const router = express.Router();
router.post('/seat_availability', authenticateToken, getSeatAvailability);
router.post('/book_seat', authenticateToken, bookSeat);
router.get('/booking_details', authenticateToken, getBookingDetails);

module.exports = router;
