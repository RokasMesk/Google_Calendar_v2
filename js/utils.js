import { getEventsFromLocalStorage } from "./services.js";
import { loadEventsForCurrentWeek } from "./events.js";

export const MILLISECONDS = (1000 * 60 * 60 * 24);

export function getFirstDayOfTheWeek(date) {
  let newDate = new Date(date);
  const day = newDate.getDay();
  const diff = newDate.getDate() - day + (day === 0 ? -6 : 1);
  const startOfWeek = new Date(newDate.setDate(diff));
  startOfWeek.setHours(0, 0, 0, 0);
  return startOfWeek;
}

export function isToday(date) {
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
}

export function createEventElement(event) {
  const eventElement = document.createElement('div');
  eventElement.className = 'calendar-event';
  eventElement.innerHTML = `<strong>${event.title}</strong>`;
  eventElement.addEventListener('click', (e) => {
    e.stopPropagation();
    showEventDetails(event)
  });

  return eventElement;
}

export function createMultiDayEventElement(event) {
  const eventBar = document.createElement('div');
  eventBar.className = 'multi-day-event';
  eventBar.id = 'multipleDayEvent';
  eventBar.innerHTML = `<strong>${event.title}</strong>`;
  eventBar.addEventListener('click', () => showEventDetails(event));
  return eventBar;
}

function showEventDetails(event) {
  const eventDetailsModal = document.getElementById("eventDetailsModal");
  document.getElementById("eventDetailsTitle").innerText = event.title;
  document.getElementById("eventDetailsPeriod").innerText = `${new Date(
    event.startDateTime
  ).toLocaleString()} - ${new Date(event.endDateTime).toLocaleString()}`;
  document.getElementById("eventDetailsDescription").innerText = event.description;
  eventDetailsModal.style.display = "block";
  eventDetailsModal.style.zIndex = 2000;
  const deleteEventButton = document.getElementById('deleteEventButton');
  deleteEventButton.addEventListener('click', () => deleteEventFromStorage(event));
}
function deleteEventFromStorage(event) {
  let events = getEventsFromLocalStorage();
  events = events.filter(e => e.id !== event.id);
  
  localStorage.setItem('calendarEvents', JSON.stringify(events));
  
  closeEventDetailsModal();
  loadEventsForCurrentWeek(event.startDateTime);
}

export function clearEvents() {
  const eventElements = document.querySelectorAll(".calendar-event");
  const multipleDayEvents = document.querySelectorAll(".multi-day-event");
  eventElements.forEach((eventElement) => eventElement.remove());
  multipleDayEvents.forEach((multipleEventElement) =>
    multipleEventElement.remove()
  );
}
export function closeEventDetailsModal() {
  const eventDetailsModal = document.getElementById('eventDetailsModal');
  eventDetailsModal.style.display = 'none';
}
export function areTwoDatesEqual(firstDate, secondDate) {
  return firstDate.getFullYear() === secondDate.getFullYear()
    && firstDate.getMonth() === secondDate.getMonth()
      && firstDate.getDate() === secondDate.getDate()
}

export const formatHourMinutesForInputForm = (hour) => {
  if (hour < 10){
    return `0${hour}:00`
  }
  return `${hour}:00`
};

export const addOneHour = (hour) => {
  const addition = hour + 1;
  return formatHourMinutesForInputForm(addition);
}
export const differenceBetweenTwoDatesInDays = (startDate, endDate) => {
  return Math.ceil((endDate - startDate) / MILLISECONDS);
};
export const dateIsInRange = (startDate, endDate, dateToCheck) => {
  return (startDate <= dateToCheck && endDate >= dateToCheck)
}
export function generateSimpleID() {
  return `${Date.now()}-${Math.floor(Math.random() * 10000)}`;
}