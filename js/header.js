import { getFirstDayOfTheWeek, isToday } from './utils.js';

export const renderWeekHeader = (date) => {
  const weekHeader = document.querySelector(".week-header");
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

export const renderHeader = (date, updateDate) => {
  const updateCurrentYearAndMonth = () => {
    const currentMonthAndDaySpan = document.getElementById("currentMonthAndDay");
    const options = { year: "numeric", month: "short" };
    currentMonthAndDaySpan.textContent = date.toLocaleDateString("en-US", options);
  };

  const switchWeeks = (days) => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + days);
    updateDate(newDate);
  };

  document.getElementById("todayButton").addEventListener("click", () => {
    updateDate(new Date());
  });

  document.getElementById("previousWeekButton").addEventListener("click", () => {
    switchWeeks(-7);
  });

  document.getElementById("nextWeekButton").addEventListener("click", () => {
    switchWeeks(7);
  });

  updateCurrentYearAndMonth();
  renderWeekHeader(date);
};
