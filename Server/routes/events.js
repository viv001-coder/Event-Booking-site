const express = require('express');
const router = express.Router();
const { getEvents, getEventById, createEvent, updateEvent, deleteEvent } = require('../controllers/eventController.js');
const { protect, admin } = require('../middleware/auth');

// Get all events
router.get('/', getEvents);
// Get event by ID
router.get('/:id', getEventById);

// Create, update, delete events (admin only)
router.post('/', protect, admin, createEvent);
router.put('/:id', protect, admin, updateEvent);
router.delete('/:id', protect, admin, deleteEvent);

module.exports = router;