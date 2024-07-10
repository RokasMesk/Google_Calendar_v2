export function saveEventToLocalStorage(event) {
  let events = JSON.parse(localStorage.getItem("calendarEvents")) || [];
  events.push(event);
  localStorage.setItem("calendarEvents", JSON.stringify(events));
}

export function getEventsFromLocalStorage() {
  let events = JSON.parse(localStorage.getItem("calendarEvents")) || [];
  return events;
}
