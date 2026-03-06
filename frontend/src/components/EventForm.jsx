import { useState } from "react";

function EventForm({ onGenerate }) {
  const [eventName, setEventName] = useState("");
  const [clubName, setClubName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!eventName || !clubName || !eventDate || !eventDescription) {
      setError("Please fill all fields.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:5000/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          eventName,
          clubName,
          eventDate,
          eventDescription
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Generation failed");
      }

      onGenerate(data);
    } catch (err) {
      setError("Server error. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="card">
      <h2>Create Event</h2>

      <form onSubmit={handleSubmit}>

        <label>Event Name</label>
        <input
          type="text"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
        />

        <label>Club Name</label>
        <input
          type="text"
          value={clubName}
          onChange={(e) => setClubName(e.target.value)}
        />

        <label>Event Date</label>
        <input
          type="date"
          value={eventDate}
          onChange={(e) => setEventDate(e.target.value)}
        />

        <label>Event Description</label>
        <textarea
          rows="4"
          value={eventDescription}
          onChange={(e) => setEventDescription(e.target.value)}
        />

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button type="submit" disabled={isLoading}>
          {isLoading ? "Generating assets..." : "Generate Assets"}
        </button>

      </form>
    </div>
  );
}

export default EventForm;