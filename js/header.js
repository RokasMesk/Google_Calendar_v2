import { renderWeekHeader } from "./calendar.js";
import { loadEventsForCurrentWeek } from "./events.js";

let currentDate = new Date();

function updateCurrentYearAndMonth() {
  const currentMonthAndDaySpan = document.getElementById("currentMonthAndDay");
  const options = { year: "numeric", month: "short" };
  currentMonthAndDaySpan.textContent = currentDate.toLocaleDateString(
    "en-US",
    options
  );
}
function switchWeeks(days) {
  currentDate.setDate(currentDate.getDate() + days);
  updateCurrentYearAndMonth();
  renderWeekHeader(currentDate);
  loadEventsForCurrentWeek(currentDate);
}

function eventListenerForSwitchingWeeksButton() {
  document.getElementById("todayButton").addEventListener("click", () => {
    currentDate = new Date();
    switchWeeks(0);
  });

  document
    .getElementById("previousWeekButton")
    .addEventListener("click", () => {
      switchWeeks(-7);
    });

  document.getElementById("nextWeekButton").addEventListener("click", () => {
    switchWeeks(7);
  });
}

export function addEventListenersToHeaderButtons() {
  updateCurrentYearAndMonth();
  eventListenerForSwitchingWeeksButton();
  loadEventsForCurrentWeek(currentDate);
}
export { currentDate };
