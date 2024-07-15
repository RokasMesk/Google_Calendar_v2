export const renderHeader = (date: Date, updateDate: (newDate:Date) => void) => {
  const updateCurrentYearAndMonth = () => {
    const currentMonthAndDaySpan = document.getElementById("currentMonthAndDay") as HTMLElement;
    const options:Intl.DateTimeFormatOptions = { year: "numeric", month: "short" };
    currentMonthAndDaySpan.textContent = date.toLocaleDateString("en-US", options);
  };

  const switchWeeks = (days:number) => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + days);
    updateDate(newDate);
  };

  const todayButton = document.getElementById("todayButton") as HTMLButtonElement;
  todayButton.addEventListener("click", () => {
    updateDate(new Date());
  });

  const previousWeekButton = document.getElementById("previousWeekButton") as HTMLButtonElement;
  previousWeekButton.addEventListener("click", () => {
    switchWeeks(-7);
  });

  const nextWeekButton = document.getElementById("nextWeekButton") as HTMLButtonElement;
  nextWeekButton.addEventListener("click", () => {
    switchWeeks(7);
  });
  
  updateCurrentYearAndMonth();
};
