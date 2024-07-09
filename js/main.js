import { renderCalendarCells, renderWeekHeader } from "./calendar.js";
import { initModalEventListeners } from "./modal.js";
import { addEventListenersToHeaderButtons } from "./header.js";
import { loadEventsForCurrentWeek } from "./events.js";

const currentDate = new Date();

function init() {
  renderCalendarCells(() => loadEventsForCurrentWeek(currentDate));
  initModalEventListeners();
  renderWeekHeader(currentDate);
  addEventListenersToHeaderButtons();
}

init();
