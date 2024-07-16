import { ButtonAction } from './enums.js';
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
    const handleButtonClick = (action) => {
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
    const removeEventListeners = (element, eventType) => {
        const newElement = element.cloneNode(true);
        element.replaceWith(newElement);
        return newElement;
    };
    let todayButton = document.getElementById("todayButton");
    todayButton = removeEventListeners(todayButton, "click");
    todayButton.addEventListener("click", () => handleButtonClick(ButtonAction.Today));
    let previousWeekButton = document.getElementById("previousWeekButton");
    previousWeekButton = removeEventListeners(previousWeekButton, "click");
    previousWeekButton.addEventListener("click", () => handleButtonClick(ButtonAction.PreviousWeek));
    let nextWeekButton = document.getElementById("nextWeekButton");
    nextWeekButton = removeEventListeners(nextWeekButton, "click");
    nextWeekButton.addEventListener("click", () => handleButtonClick(ButtonAction.NextWeek));
    updateCurrentYearAndMonth();
};
