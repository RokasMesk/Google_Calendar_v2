export function createEventElement(event) {
  const eventElement = document.createElement("div");
  eventElement.className = "calendar-event";
  eventElement.innerHTML = `<strong>${event.title}</strong><br>${event.description}`;
  const startDateTime = new Date(event.startDateTime);
  const endDateTime = new Date(event.endDateTime);
  let startDay = startDateTime.getDay();
  let dayOfWeek = startDateTime.getDay();
  const startHour = startDateTime.getHours() + startDateTime.getMinutes() / 60;
  const endHour = endDateTime.getHours() + endDateTime.getMinutes() / 60;
  const totalDays = Math.ceil(
    (endDateTime - startDateTime) / (1000 * 60 * 60 * 24)
  );
  console.log("total days " + totalDays);
  if (totalDays - 1 <= 1 && totalDays != 2) {
    const calendarCells = document.getElementById("calendarCells");
    if (startDay === 0) {
      startDay = 7;
    }
    const dayColumn = calendarCells.querySelector(
      `.cell:nth-child(${startDay})`
    );
    if (!dayColumn) {
      console.error("Day column not found for day:", dayOfWeek);
      return;
    }
    const eventDuration = (endHour - startHour) * 60;
    eventElement.style.position = "absolute";
    eventElement.style.top = `${startHour * 60 - 5 * 60}px`;
    eventElement.style.height = `${eventDuration}px`;
    dayColumn.appendChild(eventElement);
  } else {
    const weekHeader = document.querySelector(".week-header");
    const eventBar = document.createElement("div");
    eventBar.className = "multi-day-event";
    eventBar.id = "multipleDayEvent";
    eventBar.innerHTML = `<strong>${event.title}</strong>`;
    const startDayIndex = startDay === 0 ? 7 : startDay;
    const endDayIndex = startDayIndex + totalDays - 1;
    eventBar.style.gridColumn = `${startDayIndex + 1} / ${endDayIndex + 2}`;
    weekHeader.appendChild(eventBar);
    eventBar.addEventListener("click", () => showEventDetails(event));
  }
  eventElement.addEventListener("click", () => showEventDetails(event));
}

export function saveEventToLocalStorage(event) {
  let events = JSON.parse(localStorage.getItem("calendarEvents")) || [];
  events.push(event);
  localStorage.setItem("calendarEvents", JSON.stringify(events));
}

export function loadEventsFromLocalStorage() {
  let events = JSON.parse(localStorage.getItem("calendarEvents")) || [];
  events.forEach((event) => {
    createEventElement(event);
  });
}

function showEventDetails(event) {
  const eventDetailsModal = document.getElementById("eventDetailsModal");
  document.getElementById("eventDetailsTitle").innerText = event.title;
  document.getElementById("eventDetailsPeriod").innerText = `${new Date(
    event.startDateTime
  ).toLocaleString()} - ${new Date(event.endDateTime).toLocaleString()}`;
  document.getElementById("eventDetailsDescription").innerText =
    event.description;
  eventDetailsModal.style.display = "block";
}

function clearEvents() {
  const eventElements = document.querySelectorAll(".calendar-event");
  const multipleDayEvents = document.querySelectorAll(".multi-day-event");
  eventElements.forEach((eventElement) => eventElement.remove());
  multipleDayEvents.forEach((multipleEventElement) =>
    multipleEventElement.remove()
  );
}

export function loadEventsForCurrentWeek(currentDate) {
  clearEvents();
  let events = JSON.parse(localStorage.getItem("calendarEvents")) || [];
  const startOfWeek = getStartOfWeek(currentDate);
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);
  endOfWeek.setHours(23, 59, 59, 999);

  events.forEach((event) => {
    const eventStartDateTime = new Date(event.startDateTime);
    if (eventStartDateTime >= startOfWeek && eventStartDateTime <= endOfWeek) {
      console.log("true");
      createEventElement(event);
    }
  });
}

export function getStartOfWeek(date) {
  const day = date.getDay();
  const diff = date.getDate() - day + (day === 0 ? -6 : 1);
  const startOfWeek = new Date(date.setDate(diff));
  startOfWeek.setHours(0, 0, 0, 0);
  return startOfWeek;
}
