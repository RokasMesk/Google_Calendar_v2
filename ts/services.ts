import { Event } from './types.js';

const API_URL = "http://localhost:3000/events"

export const saveEventToServer = async (event: Event): Promise<Event> => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(event),
    });
    return await response.json();
  } catch (error) {
    console.error("Error saving event:", error);
    throw error;
  }
}

export const getEventsFromServer = async (): Promise<Event[]> => {
  try {
    const response = await fetch(API_URL);
    return await response.json();
  } catch (error) {
    console.error("Error fetching events:", error);
    throw error;
  }
}

export const deleteEventFromStorage = async (event: Event): Promise<void> => {
  try {
    const response = await fetch(`${API_URL}/${event.id}`, {
      method: "DELETE",
    });
  } catch (error) {
    console.error("Error deleting event:", error);
    throw error;
  }
}