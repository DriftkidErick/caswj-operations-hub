import { useEffect, useState } from "react";
import {
  getEvents,
  createEvent,
  updateEvent,
} from "../services/eventService";

const emptyFormData = {
  title: "",
  organization: "",
  eventType: "",
  venue: "",
  eventDate: "",
  startTime: "",
  endTime: "",
  ticketingRequired: false,
  pricingType: "",
  publicEventUrl: "",
  marketingTemplate: "",
  notes: "",
  status: "",
};

export default function Events() {
  const [events, setEvents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEventId, setEditingEventId] = useState(null);
  const [formData, setFormData] = useState(emptyFormData);

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      const data = await getEvents();
      setEvents(data);
    } catch (error) {
      console.error("Error loading events:", error);
    }
  };

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setFormData((currentFormData) => ({
      ...currentFormData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleNewEvent = () => {
    setEditingEventId(null);
    setFormData(emptyFormData);
    setIsModalOpen(true);
  };

  const handleEdit = (event) => {
    setEditingEventId(event.id);

    setFormData({
      title: event.title || "",
      organization: event.organization || "",
      eventType: event.eventType || "",
      venue: event.venue || "",
      eventDate: event.eventDate || "",
      startTime: event.startTime || "",
      endTime: event.endTime || "",
      ticketingRequired: event.ticketingRequired ?? false,
      pricingType: event.pricingType || "",
      publicEventUrl: event.publicEventUrl || "",
      marketingTemplate: event.marketingTemplate || "",
      notes: event.notes || "",
      status: event.status || "",
    });

    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingEventId(null);
    setFormData(emptyFormData);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (editingEventId !== null) {
        await updateEvent(editingEventId, formData);
      } else {
        await createEvent(formData);
      }

      await loadEvents();
      handleCloseModal();
    } catch (error) {
      console.error(
        editingEventId !== null
          ? "Error updating event:"
          : "Error creating event:",
        error
      );
    }
  };

  return (
    <div className="events-page">
      <div className="events-header">
        <h1>Events</h1>

        <button
          type="button"
          className="new-event-button"
          onClick={handleNewEvent}
        >
          + New Event
        </button>
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <div>
                <h2>
                  {editingEventId !== null
                    ? "Edit Event"
                    : "Create New Event"}
                </h2>

                <p>
                  {editingEventId !== null
                    ? "Update the event details below."
                    : "Fill in the details and select a template for your marketing timeline."}
                </p>
              </div>

              <button
                type="button"
                className="modal-close-button"
                onClick={handleCloseModal}
              >
                ×
              </button>
            </div>

            <form
              className="event-create-form"
              onSubmit={handleSubmit}
            >
              {/* EVENT DETAILS */}
              <section className="form-section">
                <h3>Event Details</h3>

                <div className="form-field full-width">
                  <label htmlFor="title">
                    Event Title *
                  </label>

                  <input
                    id="title"
                    type="text"
                    name="title"
                    placeholder="e.g. Spring Symphony Concert"
                    value={formData.title}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-field full-width">
                  <label htmlFor="organization">
                    Organization
                  </label>

                  <input
                    id="organization"
                    type="text"
                    name="organization"
                    placeholder="Organization"
                    value={formData.organization}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-grid three-columns">
                  <div className="form-field">
                    <label htmlFor="eventType">
                      Event Type
                    </label>

                    <input
                      id="eventType"
                      type="text"
                      name="eventType"
                      placeholder="e.g. Concert"
                      value={formData.eventType}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-field">
                    <label htmlFor="venue">
                      Venue
                    </label>

                    <input
                      id="venue"
                      type="text"
                      name="venue"
                      placeholder="e.g. Riverside Auditorium"
                      value={formData.venue}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-field">
                    <label htmlFor="status">
                      Status
                    </label>

                    <select
                      id="status"
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                    >
                      <option value="">
                        Select status
                      </option>
                      <option value="Planned">
                        Planned
                      </option>
                      <option value="Confirmed">
                        Confirmed
                      </option>
                      <option value="Completed">
                        Completed
                      </option>
                      <option value="Cancelled">
                        Cancelled
                      </option>
                    </select>
                  </div>
                </div>

                <div className="form-grid three-columns">
                  <div className="form-field">
                    <label htmlFor="eventDate">
                      Event Date *
                    </label>

                    <input
                      id="eventDate"
                      type="date"
                      name="eventDate"
                      value={formData.eventDate}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-field">
                    <label htmlFor="startTime">
                      Start Time
                    </label>

                    <input
                      id="startTime"
                      type="time"
                      name="startTime"
                      value={formData.startTime}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-field">
                    <label htmlFor="endTime">
                      End Time
                    </label>

                    <input
                      id="endTime"
                      type="time"
                      name="endTime"
                      value={formData.endTime}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </section>

              {/* TICKETING */}
              <section className="form-section">
                <h3>Ticketing</h3>

                <div className="form-grid two-columns">
                  <div className="form-field">
                    <label htmlFor="ticketingRequired">
                      Ticketing Required?
                    </label>

                    <select
                      id="ticketingRequired"
                      name="ticketingRequired"
                      value={String(
                        formData.ticketingRequired
                      )}
                      onChange={(event) =>
                        setFormData((current) => ({
                          ...current,
                          ticketingRequired:
                            event.target.value === "true",
                        }))
                      }
                    >
                      <option value="false">
                        No
                      </option>
                      <option value="true">
                        Yes
                      </option>
                    </select>
                  </div>

                  <div className="form-field">
                    <label htmlFor="pricingType">
                      Free or Paid?
                    </label>

                    <select
                      id="pricingType"
                      name="pricingType"
                      value={formData.pricingType}
                      onChange={handleChange}
                    >
                      <option value="">
                        Select
                      </option>
                      <option value="Free">
                        Free
                      </option>
                      <option value="Paid">
                        Paid
                      </option>
                    </select>
                  </div>
                </div>

                <div className="form-field full-width">
                  <label htmlFor="publicEventUrl">
                    Public Event URL
                  </label>

                  <input
                    id="publicEventUrl"
                    type="url"
                    name="publicEventUrl"
                    placeholder="https://"
                    value={formData.publicEventUrl}
                    onChange={handleChange}
                  />
                </div>
              </section>

              {/* MARKETING TEMPLATE */}
              <section className="form-section">
                <h3>Marketing Template</h3>

                <p className="form-section-description">
                  Select a template to automatically
                  generate your marketing milestones.
                </p>

                <div className="template-options">
                  <label className="template-option">
                    <input
                      type="radio"
                      name="marketingTemplate"
                      value="Class / Workshop"
                      checked={
                        formData.marketingTemplate ===
                        "Class / Workshop"
                      }
                      onChange={handleChange}
                    />

                    <span>
                      <strong>Class / Workshop</strong>
                      <small>
                        Educational class or workshop event
                      </small>
                    </span>
                  </label>

                  <label className="template-option">
                    <input
                      type="radio"
                      name="marketingTemplate"
                      value="Festival"
                      checked={
                        formData.marketingTemplate ===
                        "Festival"
                      }
                      onChange={handleChange}
                    />

                    <span>
                      <strong>Festival</strong>
                      <small>
                        Multi-act or multi-day festival
                      </small>
                    </span>
                  </label>

                  <label className="template-option">
                    <input
                      type="radio"
                      name="marketingTemplate"
                      value="General Event"
                      checked={
                        formData.marketingTemplate ===
                        "General Event"
                      }
                      onChange={handleChange}
                    />

                    <span>
                      <strong>General Event</strong>
                      <small>
                        Fundraiser, community event, or other
                      </small>
                    </span>
                  </label>

                  <label className="template-option">
                    <input
                      type="radio"
                      name="marketingTemplate"
                      value="Jazz / Community Band Concert"
                      checked={
                        formData.marketingTemplate ===
                        "Jazz / Community Band Concert"
                      }
                      onChange={handleChange}
                    />

                    <span>
                      <strong>
                        Jazz / Community Band Concert
                      </strong>
                      <small>
                        Jazz ensemble or community band performance
                      </small>
                    </span>
                  </label>

                  <label className="template-option">
                    <input
                      type="radio"
                      name="marketingTemplate"
                      value="Symphony Concert"
                      checked={
                        formData.marketingTemplate ===
                        "Symphony Concert"
                      }
                      onChange={handleChange}
                    />

                    <span>
                      <strong>
                        Symphony Concert
                      </strong>
                      <small>
                        Full orchestra or symphony concert
                      </small>
                    </span>
                  </label>

                  <label className="template-option">
                    <input
                      type="radio"
                      name="marketingTemplate"
                      value="Theatre Production"
                      checked={
                        formData.marketingTemplate ===
                        "Theatre Production"
                      }
                      onChange={handleChange}
                    />

                    <span>
                      <strong>
                        Theatre Production
                      </strong>
                      <small>
                        Play, musical, or dramatic production
                      </small>
                    </span>
                  </label>
                </div>
              </section>

              {/* NOTES */}
              <section className="form-section">
                <div className="form-field full-width">
                  <label htmlFor="notes">
                    Notes
                  </label>

                  <textarea
                    id="notes"
                    name="notes"
                    placeholder="Any additional notes about this event..."
                    value={formData.notes}
                    onChange={handleChange}
                  />
                </div>
              </section>

              {/* ACTIONS */}
              <div className="form-actions">
                <button
                  type="submit"
                  className="event-form-submit"
                >
                  {editingEventId !== null
                    ? "Save Changes"
                    : "Create Event"}
                </button>

                <button
                  type="button"
                  className="event-form-cancel"
                  onClick={handleCloseModal}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="events-list">
        {events.length === 0 ? (
          <div className="empty-state">
            <p>No events yet.</p>
          </div>
        ) : (
          events.map((event) => (
            <div
              key={event.id}
              className="event-card"
            >
              <div className="event-card-date">
                <span className="event-month">
                  {new Date(
                    `${event.eventDate}T00:00:00`
                  )
                    .toLocaleString("en-US", {
                      month: "short",
                    })
                    .toUpperCase()}
                </span>

                <strong className="event-day">
                  {new Date(
                    `${event.eventDate}T00:00:00`
                  ).getDate()}
                </strong>
              </div>

              <div className="event-card-content">
                <div className="event-card-top">
                  <div>
                    <h3>{event.title}</h3>

                    <div className="event-meta">
                      {event.organization && (
                        <span>
                          {event.organization}
                        </span>
                      )}

                      {event.eventType && (
                        <span>
                          {event.eventType}
                        </span>
                      )}

                      {event.marketingTemplate && (
                        <span>
                          {event.marketingTemplate}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="event-card-actions">
                    {event.status && (
                      <span className="event-status">
                        {event.status}
                      </span>
                    )}

                    <button
                      type="button"
                      className="event-edit-button"
                      onClick={() => handleEdit(event)}
                    >
                      Edit
                    </button>
                  </div>
                </div>

                {event.notes && (
                  <p className="event-description">
                    {event.notes}
                  </p>
                )}

                <div className="event-details">
                  {event.venue && (
                    <p className="event-location">
                      Venue: {event.venue}
                    </p>
                  )}

                  {(event.startTime ||
                    event.endTime) && (
                    <p className="event-time">
                      Time:{" "}
                      {event.startTime || "TBD"}

                      {event.endTime &&
                        ` - ${event.endTime}`}
                    </p>
                  )}

                  {event.pricingType && (
                    <p className="event-ticketing">
                      Admission:{" "}
                      {event.pricingType}
                    </p>
                  )}
                </div>

                {event.publicEventUrl && (
                  <a
                    href={event.publicEventUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="event-public-link"
                  >
                    View Public Event
                  </a>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}