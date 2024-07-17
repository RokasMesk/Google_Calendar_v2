import { closeEventDetailsModal } from "./modal.js";
import { loadEventsForCurrentWeek } from "./events.js";
export function saveEventToLocalStorage(event) {
    let events = JSON.parse(localStorage.getItem("calendarEvents") || '[]');
    events.push(event);
    localStorage.setItem("calendarEvents", JSON.stringify(events));
}
export function getEventsFromLocalStorage() {
    let events = JSON.parse(localStorage.getItem("calendarEvents") || '[]');
    return events;
}
export function deleteEventFromStorage(event) {
    let events = getEventsFromLocalStorage();
    events = events.filter(e => e.id !== event.id);
    localStorage.setItem("calendarEvents", JSON.stringify(events));
    closeEventDetailsModal();
    loadEventsForCurrentWeek(new Date(event.startDateTime));
}
