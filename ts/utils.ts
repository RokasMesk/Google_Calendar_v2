import { deleteEventFromStorage } from "./services.ts";
import { Event } from "./types.ts";
export const MILLISECONDS = (1000 * 60 * 60 * 24);

export function getFirstDayOfTheWeek(date: Date): Date {
  let newDate = new Date(date);
  const day = newDate.getDay();
  const diff = newDate.getDate() - day + (day === 0 ? -6 : 1);
  const startOfWeek = new Date(newDate.setDate(diff));
  startOfWeek.setHours(0, 0, 0, 0);
  return startOfWeek;
}

export function isToday(date: Date): boolean {
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
}

export function createEventElement(event: Event): HTMLElement {
  const eventElement = document.createElement('div');
  eventElement.className = 'calendar-event';
  eventElement.innerHTML = `<strong>${event.title}</strong>`;
  eventElement.addEventListener('click', (e) => {
    e.stopPropagation();
    showEventDetails(event)
  });

  return eventElement;
}

export function createMultiDayEventElement(event:Event): HTMLElement {
  const eventBar = document.createElement('div');
  eventBar.className = 'multi-day-event';
  eventBar.id = 'multipleDayEvent';
  eventBar.innerHTML = `<strong>${event.title}</strong>`;
  eventBar.addEventListener('click', () => showEventDetails(event));
  return eventBar;
}

function showEventDetails(event:Event): void {
  const eventDetailsModal = document.getElementById("eventDetailsModal") as HTMLElement;
  (document.getElementById("eventDetailsTitle") as HTMLElement).innerText = event.title;
  (document.getElementById("eventDetailsPeriod") as HTMLElement).innerText = `${new Date(
    event.startDateTime
  ).toLocaleString()} - ${new Date(event.endDateTime).toLocaleString()}`;
  (document.getElementById("eventDetailsDescription") as HTMLElement).innerText = event.description;
  eventDetailsModal.style.display = "block";
  eventDetailsModal.style.zIndex = '2000';
  const deleteEventButton = document.getElementById('deleteEventButton') as HTMLElement;
  deleteEventButton.addEventListener('click', () => deleteEventFromStorage(event));
}

export function clearEvents(): void {
  const eventElements = document.querySelectorAll(".calendar-event");
  const multipleDayEvents = document.querySelectorAll(".multi-day-event");
  eventElements.forEach((eventElement) => eventElement.remove());
  multipleDayEvents.forEach((multipleEventElement) =>
    multipleEventElement.remove()
  );
}
export function areTwoDatesEqual(firstDate: Date, secondDate: Date): boolean {
  return firstDate.getFullYear() === secondDate.getFullYear()
    && firstDate.getMonth() === secondDate.getMonth()
      && firstDate.getDate() === secondDate.getDate()
}

export const formatHourMinutesForInputForm = (hour: number): string => {
  if (hour < 10){
    return `0${hour}:00`
  }
  return `${hour}:00`
};

export const addOneHour = (hour: number): string => {
  const addition = hour + 1;
  return formatHourMinutesForInputForm(addition);
}
export const differenceBetweenTwoDatesInDays = (startDate: Date, endDate: Date): number => {
  return Math.ceil((endDate.getTime() - startDate.getTime()) / MILLISECONDS);
};
export const dateIsInRange = (startDate: Date, endDate: Date, dateToCheck: Date): boolean => {
  return (startDate <= dateToCheck && endDate >= dateToCheck)
}
export function generateSimpleID(): string {
  return `${Date.now()}-${Math.floor(Math.random() * 10000)}`;
}