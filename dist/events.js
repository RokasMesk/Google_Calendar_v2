import { createEventElement, createMultiDayEventElement, getFirstDayOfTheWeek, clearEvents, differenceBetweenTwoDatesInDays, dateIsInRange } from './utils.js';
import { getEventsFromLocalStorage } from './services.js';
const HOUR_IN_MINUTES = 60;
const doesEventOverlapWithOtherEvents = (eventCurrent) => {
    const eventStartDateTime = new Date(eventCurrent.startDateTime);
    const eventEndDateTime = new Date(eventCurrent.endDateTime);
    const events = getEventsFromLocalStorage();
    return events.filter((event) => {
        const eventStart = new Date(event.startDateTime);
        const eventEnd = new Date(event.endDateTime);
        return ((dateIsInRange(eventStart, eventEnd, eventStartDateTime) ||
            dateIsInRange(eventStart, eventEnd, eventEndDateTime)));
    });
};
const renderShortEvent = (event) => {
    const overlappingEvents = doesEventOverlapWithOtherEvents(event);
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
    const dayColumn = calendarCells === null || calendarCells === void 0 ? void 0 : calendarCells.querySelector(`.cell:nth-child(${startDay})`);
    if (!dayColumn) {
        console.error("Day column not found for day:", startDay);
        return;
    }
    const dayColumnWidth = dayColumn.offsetWidth;
    const eventDuration = (endHour - startHour) * HOUR_IN_MINUTES;
    eventElement.style.position = "absolute";
    eventElement.style.top = `${startHour * HOUR_IN_MINUTES - 5 * 60}px`;
    eventElement.style.height = `${eventDuration}px`;
    const totalOverlappingEvents = overlappingEvents.length;
    const width = dayColumnWidth / totalOverlappingEvents;
    const index = overlappingEvents.findIndex(e => e.id === event.id);
    const weekDayOffset = (startDay - 1) * dayColumnWidth;
    eventElement.style.width = `${dayColumnWidth - (width * index)}px`;
    eventElement.style.left = `${index * width + (weekDayOffset)}px`;
    dayColumn.appendChild(eventElement);
};
const renderMultiDayEvent = (event, startOfWeek, endOfWeek) => {
    const eventStartDateTime = new Date(event.startDateTime);
    const eventEndDateTime = new Date(event.endDateTime);
    let startDayIndex = -1;
    let endDayIndex = -1;
    const doesEventSpanEntireWeek = eventStartDateTime < startOfWeek && eventEndDateTime > endOfWeek;
    const doesEventStartBeforeAndEndCurrentWeek = eventStartDateTime < startOfWeek;
    const doesEventStartCurrentAndEndNextWeek = eventEndDateTime > endOfWeek;
    const startDay = eventStartDateTime.getDay() === 0 ? 7 : eventStartDateTime.getDay();
    const endDay = eventEndDateTime.getDay() === 0 ? 7 : eventEndDateTime.getDay();
    if (doesEventSpanEntireWeek) {
        startDayIndex = 1;
        endDayIndex = 7;
    }
    else if (doesEventStartBeforeAndEndCurrentWeek) {
        startDayIndex = 1;
        endDayIndex = endDay;
    }
    else if (doesEventStartCurrentAndEndNextWeek) {
        startDayIndex = startDay;
        endDayIndex = 7;
    }
    else {
        startDayIndex = startDay;
        endDayIndex = endDay;
    }
    const eventBar = createMultiDayEventElement(event);
    eventBar.style.gridColumn = `${startDayIndex} / ${endDayIndex + 1}`;
    const multiDayEventPlaceHolder = document.querySelector(".multi-day-events-container");
    multiDayEventPlaceHolder === null || multiDayEventPlaceHolder === void 0 ? void 0 : multiDayEventPlaceHolder.appendChild(eventBar);
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
        const totalDays = differenceBetweenTwoDatesInDays(eventStartDateTime, eventEndDateTime);
        const shouldRenderEvent = eventStartDateTime <= endOfWeek && eventEndDateTime >= startOfWeek;
        const isShortEvent = totalDays <= 1;
        if (shouldRenderEvent) {
            if (isShortEvent) {
                renderShortEvent(event);
            }
            else {
                renderMultiDayEvent(event, startOfWeek, endOfWeek);
            }
        }
    });
};
