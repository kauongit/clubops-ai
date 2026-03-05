/**
 * AI Service - Mock generation functions for ClubOps AI Event Generator
 * This is a prototype implementation using template-based logic rather than actual AI/LLM integration
 */

/**
 * Generates formatted poster text for an event
 * @param {string} eventName - Name of the event
 * @param {string} clubName - Name of the organizing club
 * @param {string} eventDate - Date of the event
 * @returns {string} Formatted poster text
 */
function generatePoster(eventName, clubName, eventDate) {
  // Handle null/undefined parameters gracefully
  if (!eventName || !clubName || !eventDate) {
    return '';
  }

  return `🎉 ${eventName.toUpperCase()} 🎉

Presented by ${clubName}
Date: ${eventDate}

Join us for an incredible experience!
Don't miss out on this exciting event.

Mark your calendars and be part of something special!`;
}

/**
 * Generates social media caption with hashtags
 * @param {string} eventName - Name of the event
 * @param {string} clubName - Name of the organizing club
 * @returns {string} Social media caption with hashtags
 */
function generateSocialCaption(eventName, clubName) {
  // Handle null/undefined parameters gracefully
  if (!eventName || !clubName) {
    return '';
  }

  // Create hashtags from event name and club name
  const eventHashtag = eventName.replace(/\s+/g, '');
  const clubHashtag = clubName.replace(/\s+/g, '');

  return `🚀 ${eventName} is coming! Join ${clubName} for an amazing experience. Don't miss out! #${eventHashtag} #${clubHashtag} #CampusEvent #StudentLife`;
}

/**
 * Generates professional email invitation
 * @param {string} eventName - Name of the event
 * @param {string} eventDescription - Description of the event
 * @returns {string} Professional email invitation text
 */
function generateEmail(eventName, eventDescription) {
  // Handle null/undefined parameters gracefully
  if (!eventName || !eventDescription) {
    return '';
  }

  return `Dear Student,

We are excited to invite you to ${eventName}!

${eventDescription}

We look forward to seeing you there. This is a great opportunity to connect, learn, and be part of our community.

Please mark your calendar and join us for this special event.

Best regards,
The Organizing Team`;
}

/**
 * Generates certificate template with participant placeholder
 * @param {string} eventName - Name of the event
 * @returns {string} Certificate template text
 */
function generateCertificate(eventName) {
  // Handle null/undefined parameters gracefully
  if (!eventName) {
    return '';
  }

  return `CERTIFICATE OF PARTICIPATION

This certifies that

[Participant Name]

has successfully participated in

${eventName}

We appreciate your dedication and involvement.`;
}

/**
 * Generates concise event summary
 * @param {string} clubName - Name of the organizing club
 * @param {string} eventName - Name of the event
 * @param {string} eventDate - Date of the event
 * @returns {string} Concise event summary
 */
function generateSummary(clubName, eventName, eventDate) {
  // Handle null/undefined parameters gracefully
  if (!clubName || !eventName || !eventDate) {
    return '';
  }

  return `${eventName}, organized by ${clubName} on ${eventDate}, is an exciting event designed to bring together students and create meaningful experiences. This event offers a unique opportunity for participants to engage, learn, and connect with their peers.`;
}

// Export all generation functions
module.exports = {
  generatePoster,
  generateSocialCaption,
  generateEmail,
  generateCertificate,
  generateSummary
};
