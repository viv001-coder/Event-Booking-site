const express = require('express');
const router = express.Router();
const { bookEvent, confirmBooking, getMyBookings, cancelBooking, sendBookingOTP } = require('../controllers/bookingController');
const { protect, admin } = require('../middleware/auth');

// Send OTP for booking confirmation
router.post('/send-otp', protect, sendBookingOTP);

// Book an event
router.post('/', protect, bookEvent);

// Admin confirms booking and optionally updates payment status
router.put('/:id/confirm', protect, admin, confirmBooking);
router.get('/my', protect, getMyBookings);
router.delete('/:id', protect, cancelBooking);

module.exports = router;