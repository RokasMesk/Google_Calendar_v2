import { loadEventsForCurrentWeek } from './events.ts';
import { getFirstDayOfTheWeek, isToday } from './utils.ts';

export const renderCalendarCells = (date: Date, openModal: (date:Date)=> void): void => {
  const calendarCells = document.getElementById("calendarCells") as HTMLElement;
  calendarCells.innerHTML = ''; 
  const cellsInOneColumn = 19;
  const daysInWeek = 7;

  const startOfWeek = getFirstDayOfTheWeek(date);

  for (let i = 0; i < cellsInOneColumn * daysInWeek; i++) {
    const cell = document.createElement("div");
    cell.className = "cell";
    const day = i % daysInWeek;
    const hourIndex = Math.floor(i / daysInWeek); 
    const cellDate = new Date(startOfWeek);
    cellDate.setDate(cellDate.getDate() + day);
    cellDate.setHours(5 + hourIndex); 
    cell.addEventListener('click', () => openModal(cellDate));
    calendarCells.appendChild(cell);
  }

  renderWeekHeader(date);
  loadEventsForCurrentWeek(date);
};

export const renderWeekHeader = (date:Date): void => {
  const weekHeader = document.querySelector(".week-header") as HTMLElement;
  weekHeader.innerHTML = "";
  const firstDayOfTheWeek = getFirstDayOfTheWeek(date);
  const wholeWeekHeader = document.createElement("div");
  wholeWeekHeader.className = "day";
  for (let i = 0; i < 7; i++) {
    const day = new Date(firstDayOfTheWeek);
    day.setDate(day.getDate() + i);
    const dayName = day.toLocaleDateString("en-US", { weekday: "short" });
    const dayHeader = document.createElement("div");
    dayHeader.className = "day";
    dayHeader.innerHTML = `<span class='day-name'>${dayName}</span><span class="day-number">${day.getDate()}</span>`;
    if (isToday(day)) {
      dayHeader.classList.add("current-day");
    }
    weekHeader.appendChild(dayHeader);
  }
};
