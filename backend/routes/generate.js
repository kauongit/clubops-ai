const express = require('express');
const router = express.Router();
const {
  generatePoster,
  generateSocialCaption,
  generateEmail,
  generateCertificate,
  generateSummary
} = require('../services/aiService');

/**
 * POST /generate
 * Generates all five event assets from event prompt data
 * 
 * Request body:
 * {
 *   eventName: string (required, max 200 chars),
 *   clubName: string (required, max 100 chars),
 *   eventDate: string (required),
 *   eventDescription: string (required, max 1000 chars)
 * }
 * 
 * Success response (200):
 * {
 *   poster: string,
 *   socialCaption: string,
 *   email: string,
 *   certificate: string,
 *   summary: string
 * }
 * 
 * Error response (400):
 * {
 *   error: string
 * }
 */
router.post('/generate', (req, res) => {
  try {
    const { eventName, clubName, eventDate, eventDescription } = req.body;

    // Validate all required fields are present
    if (eventName === undefined) {
      return res.status(400).json({ error: 'Missing required field: eventName' });
    }
    if (clubName === undefined) {
      return res.status(400).json({ error: 'Missing required field: clubName' });
    }
    if (eventDate === undefined) {
      return res.status(400).json({ error: 'Missing required field: eventDate' });
    }
    if (eventDescription === undefined) {
      return res.status(400).json({ error: 'Missing required field: eventDescription' });
    }

    // Validate field types are strings
    if (typeof eventName !== 'string') {
      return res.status(400).json({ error: 'eventName must be a string' });
    }
    if (typeof clubName !== 'string') {
      return res.status(400).json({ error: 'clubName must be a string' });
    }
    if (typeof eventDate !== 'string') {
      return res.status(400).json({ error: 'eventDate must be a string' });
    }
    if (typeof eventDescription !== 'string') {
      return res.status(400).json({ error: 'eventDescription must be a string' });
    }

    // Validate fields are non-empty after trimming
    if (eventName.trim().length === 0) {
      return res.status(400).json({ error: 'eventName cannot be empty' });
    }
    if (clubName.trim().length === 0) {
      return res.status(400).json({ error: 'clubName cannot be empty' });
    }
    if (eventDate.trim().length === 0) {
      return res.status(400).json({ error: 'eventDate cannot be empty' });
    }
    if (eventDescription.trim().length === 0) {
      return res.status(400).json({ error: 'eventDescription cannot be empty' });
    }

    // Validate field lengths
    if (eventName.length > 200) {
      return res.status(400).json({ error: 'eventName exceeds maximum length of 200 characters' });
    }
    if (clubName.length > 100) {
      return res.status(400).json({ error: 'clubName exceeds maximum length of 100 characters' });
    }
    if (eventDescription.length > 1000) {
      return res.status(400).json({ error: 'eventDescription exceeds maximum length of 1000 characters' });
    }

    // Generate all 5 assets using AI service
    const poster = generatePoster(eventName, clubName, eventDate);
    const socialCaption = generateSocialCaption(eventName, clubName);
    const email = generateEmail(eventName, eventDescription);
    const certificate = generateCertificate(eventName);
    const summary = generateSummary(clubName, eventName, eventDate);

    // Return JSON response with all assets
    return res.status(200).json({
      poster,
      socialCaption,
      email,
      certificate,
      summary
    });

  } catch (error) {
    // Handle any unexpected errors
    console.error('Error generating assets:', error);
    return res.status(500).json({ error: 'Failed to generate assets. Please try again.' });
  }
});

module.exports = router;
