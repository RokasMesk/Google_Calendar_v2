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
    const todayButton = document.getElementById("todayButton");
    todayButton.addEventListener("click", () => {
        updateDate(new Date());
    });
    const previousWeekButton = document.getElementById("previousWeekButton");
    previousWeekButton.addEventListener("click", () => {
        switchWeeks(-7);
    });
    const nextWeekButton = document.getElementById("nextWeekButton");
    nextWeekButton.addEventListener("click", () => {
        switchWeeks(7);
    });
    updateCurrentYearAndMonth();
};
