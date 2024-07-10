import { createEventElement, createMultiDayEventElement, getFirstDayOfTheWeek, clearEvents } from './utils.js';
import {getEventsFromLocalStorage} from './services.js'
const MILLISECONDS = (1000 * 60 * 60 * 24);
const HOUR_IN_MINUTES = 60;

const renderShortEvent = (event) => {
  const eventElement = createEventElement(event);
  const startDateTime = new Date(event.startDateTime);
  const endDateTime = new Date(event.endDateTime);
  let startDay = startDateTime.getDay();
  const startHour = startDateTime.getHours() + startDateTime.getMinutes() / HOUR_IN_MINUTES;
  const endHour = endDateTime.getHours() + endDateTime.getMinutes() / HOUR_IN_MINUTES;

  const calendarCells = document.getElementById("calendarCells");
  if (startDay === 0) {
    startDay = 7;
  }
  const dayColumn = calendarCells.querySelector(`.cell:nth-child(${startDay})`);
  if (!dayColumn) {
    console.error("Day column not found for day:", startDay);
    return;
  }
  const eventDuration = (endHour - startHour) * HOUR_IN_MINUTES;
  eventElement.style.position = "absolute";
  eventElement.style.top = `${startHour * HOUR_IN_MINUTES - 5 * 60}px`;
  eventElement.style.height = `${eventDuration}px`;
  dayColumn.appendChild(eventElement);
};

const renderMultiDayEvent = (event) => {
  const eventBar = createMultiDayEventElement(event);
  const startDateTime = new Date(event.startDateTime);
  const endDateTime = new Date(event.endDateTime);
  let startDay = startDateTime.getDay();
  const totalDays = Math.ceil((endDateTime - startDateTime) / MILLISECONDS);

  const multiDayEventPlaceHolder = document.querySelector(".multi-day-events-container");
  const startDayIndex = startDay === 0 ? 7 : startDay;
  const endDayIndex = startDayIndex + totalDays - 1;
  eventBar.style.gridColumn = `${startDayIndex } / ${endDayIndex + 1}`;
  multiDayEventPlaceHolder.appendChild(eventBar);
};

export const loadEventsForCurrentWeek = (currentDate) => {
  clearEvents();
  const startOfWeek = getFirstDayOfTheWeek(currentDate);
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);
  endOfWeek.setHours(23, 59, 59, 999);
  
  const events = getEventsFromLocalStorage();
  
  events.forEach((event) => {
    const eventStartDateTime = new Date(event.startDateTime);
    const eventEndDateTime = new Date(event.endDateTime);
    const shouldRenderEvent = eventStartDateTime <= endOfWeek && eventEndDateTime >= startOfWeek
    const totalDays = Math.ceil((eventEndDateTime - eventStartDateTime) / MILLISECONDS);
    const isShortEvent = totalDays <= 1
    if (shouldRenderEvent) {
      if (isShortEvent) {
        renderShortEvent(event);
      } else {
        renderMultiDayEvent(event);
      }
    }
  });
};
