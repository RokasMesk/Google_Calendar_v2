import { closeEventDetailsModal } from "./modal.js";
import { loadEventsForCurrentWeek } from "./events.js";
import { Event} from './types.js'
export function saveEventToLocalStorage(event:Event): void {
  let events: Event[] = JSON.parse(localStorage.getItem("calendarEvents") || '[]');
  events.push(event);
  localStorage.setItem("calendarEvents", JSON.stringify(events));
}

export function getEventsFromLocalStorage(): Event[] {
  let events: Event[] = JSON.parse(localStorage.getItem("calendarEvents") || '[]');
  return events;
}

export function deleteEventFromStorage(event:Event): void {
  let events: Event[] = getEventsFromLocalStorage();
  events = events.filter(e => e.id !== event.id);
  
  localStorage.setItem("calendarEvents", JSON.stringify(events));
  closeEventDetailsModal();
  loadEventsForCurrentWeek(new Date(event.startDateTime));
}