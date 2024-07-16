import { ButtonAction } from './enums.js';

export const renderHeader = (date: Date, updateDate: (newDate: Date) => void) => {
  const updateCurrentYearAndMonth = () => {
    const currentMonthAndDaySpan = document.getElementById("currentMonthAndDay") as HTMLElement;
    const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "short" };
    currentMonthAndDaySpan.textContent = date.toLocaleDateString("en-US", options);
  };

  const switchWeeks = (days: number) => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + days);
    updateDate(newDate);
  };

  const handleButtonClick = (action: ButtonAction) => {
    switch (action) {
      case ButtonAction.Today:
        updateDate(new Date());
        break;
      case ButtonAction.PreviousWeek:
        switchWeeks(-7);
        break;
      case ButtonAction.NextWeek:
        switchWeeks(7);
        break;
    }
  };

  const removeEventListeners = (element: HTMLButtonElement, eventType: string): HTMLButtonElement => {
    const newElement = element.cloneNode(true) as HTMLButtonElement;
    element.replaceWith(newElement);
    return newElement;
  };

  let todayButton = document.getElementById("todayButton") as HTMLButtonElement;
  todayButton = removeEventListeners(todayButton, "click");
  todayButton.addEventListener("click", () => handleButtonClick(ButtonAction.Today));

  let previousWeekButton = document.getElementById("previousWeekButton") as HTMLButtonElement;
  previousWeekButton = removeEventListeners(previousWeekButton, "click");
  previousWeekButton.addEventListener("click", () => handleButtonClick(ButtonAction.PreviousWeek));

  let nextWeekButton = document.getElementById("nextWeekButton") as HTMLButtonElement;
  nextWeekButton = removeEventListeners(nextWeekButton, "click");
  nextWeekButton.addEventListener("click", () => handleButtonClick(ButtonAction.NextWeek));

  updateCurrentYearAndMonth();
};
