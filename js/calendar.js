import { renderWeekHeader } from './header.js';
import { loadEventsForCurrentWeek } from './events.js';

export const renderCalendarCells = (date, openModal) => {
  const calendarCells = document.getElementById("calendarCells");
  calendarCells.innerHTML = ''; 
  const cellsInOneColumn = 19;
  const daysInWeek = 7;
  for (let i = 0; i < cellsInOneColumn * daysInWeek; i++) {
    const cell = document.createElement("div");
    cell.className = "cell";
    cell.addEventListener('click', () => openModal(date)); 
    calendarCells.appendChild(cell);
  }
  renderWeekHeader(date);
  loadEventsForCurrentWeek(date);
};
