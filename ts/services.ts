import { closeEventDetailsModal } from "./modal.ts";
import { loadEventsForCurrentWeek } from "./events.ts";
import { Event} from './types.ts'
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