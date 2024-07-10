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
};
