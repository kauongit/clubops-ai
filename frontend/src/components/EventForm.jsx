import { useState } from 'react';

function EventForm({ onGenerate }) {
  const [eventName, setEventName] = useState('');
  const [clubName, setClubName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Character limits
  const EVENT_NAME_LIMIT = 200;
  const CLUB_NAME_LIMIT = 100;
  const EVENT_DESCRIPTION_LIMIT = 1000;

  // Check if all fields are non-empty
  const isFormValid = () => {
    return (
      eventName.trim().length > 0 &&
      clubName.trim().length > 0 &&
      eventDate.trim().length > 0 &&
      eventDescription.trim().length > 0
    );
  };

  // Clear error when user makes changes
  const handleInputChange = (setter) => (e) => {
    setError(null);
    setter(e.target.value);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isFormValid()) {
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:5000/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          eventName: eventName.trim(),
          clubName: clubName.trim(),
          eventDate: eventDate.trim(),
          eventDescription: eventDescription.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate assets');
      }

      // Call the onGenerate callback with the generated assets
      onGenerate(data);
    } catch (err) {
      setError(err.message || 'Unable to connect to server. Please ensure the backend is running on port 5000.');
    } finally {
      setIsLoading(false);
    }
  };

  // Show character count when approaching limit
  const showCharCount = (current, limit) => {
    const threshold = limit * 0.8; // Show count at 80% of limit
    return current >= threshold;
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label htmlFor="eventName" style={styles.label}>
            Event Name *
          </label>
          <input
            type="text"
            id="eventName"
            value={eventName}
            onChange={handleInputChange(setEventName)}
            maxLength={EVENT_NAME_LIMIT}
            disabled={isLoading}
            style={styles.input}
            placeholder="Enter event name"
          />
          {showCharCount(eventName.length, EVENT_NAME_LIMIT) && (
            <span style={styles.charCount}>
              {eventName.length}/{EVENT_NAME_LIMIT}
            </span>
          )}
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="clubName" style={styles.label}>
            Club Name *
          </label>
          <input
            type="text"
            id="clubName"
            value={clubName}
            onChange={handleInputChange(setClubName)}
            maxLength={CLUB_NAME_LIMIT}
            disabled={isLoading}
            style={styles.input}
            placeholder="Enter club name"
          />
          {showCharCount(clubName.length, CLUB_NAME_LIMIT) && (
            <span style={styles.charCount}>
              {clubName.length}/{CLUB_NAME_LIMIT}
            </span>
          )}
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="eventDate" style={styles.label}>
            Event Date *
          </label>
          <input
            type="date"
            id="eventDate"
            value={eventDate}
            onChange={handleInputChange(setEventDate)}
            disabled={isLoading}
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="eventDescription" style={styles.label}>
            Event Description *
          </label>
          <textarea
            id="eventDescription"
            value={eventDescription}
            onChange={handleInputChange(setEventDescription)}
            maxLength={EVENT_DESCRIPTION_LIMIT}
            disabled={isLoading}
            style={styles.textarea}
            placeholder="Enter event description"
            rows="5"
          />
          {showCharCount(eventDescription.length, EVENT_DESCRIPTION_LIMIT) && (
            <span style={styles.charCount}>
              {eventDescription.length}/{EVENT_DESCRIPTION_LIMIT}
            </span>
          )}
        </div>

        {error && (
          <div style={styles.error}>
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={!isFormValid() || isLoading}
          style={{
            ...styles.button,
            ...((!isFormValid() || isLoading) && styles.buttonDisabled),
          }}
        >
          {isLoading ? 'Generating...' : 'Generate Assets'}
        </button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    position: 'relative',
  },
  label: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#333',
  },
  input: {
    padding: '10px 12px',
    fontSize: '14px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    outline: 'none',
    transition: 'border-color 0.2s',
  },
  textarea: {
    padding: '10px 12px',
    fontSize: '14px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    outline: 'none',
    resize: 'vertical',
    fontFamily: 'inherit',
    transition: 'border-color 0.2s',
  },
  charCount: {
    fontSize: '12px',
    color: '#666',
    textAlign: 'right',
  },
  button: {
    padding: '12px 24px',
    fontSize: '16px',
    fontWeight: '600',
    color: '#fff',
    backgroundColor: '#007bff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
    cursor: 'not-allowed',
  },
  error: {
    padding: '12px',
    backgroundColor: '#fee',
    color: '#c33',
    border: '1px solid #fcc',
    borderRadius: '4px',
    fontSize: '14px',
  },
};

export default EventForm;
