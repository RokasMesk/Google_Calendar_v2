import { isToday, areTwoDatesEqual } from './utils.js';
export const renderAside = (currentDate, updateDate, openModal) => {
    const currentMonth = document.getElementById("currentDateCalendarWidget");
    const prevMonthButton = document.getElementById("prevMonth");
    const nextMonthButton = document.getElementById("nextMonth");
    const calendarDates = document.getElementById("calendarDates");
    const addEventButton = document.getElementById("addEventButton");
    const TOTAL_CELLS = 42;
    let displayedMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    let selectedDate = new Date(currentDate);
    const updateMonthDisplay = () => {
        currentMonth.textContent = displayedMonth.toLocaleDateString("en-US", { year: 'numeric', month: 'short' });
        renderMonthDays();
    };
    const createDateCell = (day, className, clickHandler) => {
        const dateCell = document.createElement('div');
        dateCell.textContent = day.toString();
        if (className) {
            dateCell.classList.add(className);
        }
        dateCell.addEventListener('click', clickHandler);
        calendarDates.appendChild(dateCell);
        return dateCell;
    };
    const renderPreviousMonthDays = (startDay, previousMonthTotalDays) => {
        for (let i = 0; i < startDay; i++) {
            const day = previousMonthTotalDays - startDay + 1 + i;
            const cellDate = new Date(displayedMonth.getFullYear(), displayedMonth.getMonth() - 1, day);
            createDateCell(day, 'prev-month-day', () => {
                displayedMonth.setMonth(displayedMonth.getMonth() - 1);
                displayedMonth.setDate(day);
                selectedDate = cellDate;
                updateDate(selectedDate);
                updateMonthDisplay();
            });
        }
    };
    const renderCurrentMonthDays = (totalDays) => {
        for (let day = 1; day <= totalDays; day++) {
            const cellDate = new Date(displayedMonth.getFullYear(), displayedMonth.getMonth(), day);
            let className = '';
            if (isToday(cellDate)) {
                className = 'today';
            }
            else if (selectedDate && areTwoDatesEqual(cellDate, selectedDate)) {
                className = 'selected';
            }
            createDateCell(day, className, () => {
                selectedDate = cellDate;
                updateDate(selectedDate);
                updateMonthDisplay();
            });
        }
    };
    const renderNextMonthDays = (renderedCells) => {
        for (let i = 1; i <= TOTAL_CELLS - renderedCells; i++) {
            const cellDate = new Date(displayedMonth.getFullYear(), displayedMonth.getMonth() + 1, i);
            const className = selectedDate && areTwoDatesEqual(cellDate, selectedDate) ? 'selected' : 'next-month-day';
            createDateCell(i, className, () => {
                displayedMonth.setMonth(displayedMonth.getMonth() + 1);
                displayedMonth.setDate(i);
                selectedDate = cellDate;
                updateDate(selectedDate);
                updateMonthDisplay();
            });
        }
    };
    const renderMonthDays = () => {
        calendarDates.innerHTML = '';
        const firstDayOfMonth = new Date(displayedMonth.getFullYear(), displayedMonth.getMonth(), 1);
        let startDay = firstDayOfMonth.getDay();
        if (startDay === 0) {
            startDay = 7;
        }
        const lastDayOfMonth = new Date(displayedMonth.getFullYear(), displayedMonth.getMonth() + 1, 0);
        const totalDays = lastDayOfMonth.getDate();
        const previousMonthLastDay = new Date(displayedMonth.getFullYear(), displayedMonth.getMonth(), 0);
        const previousMonthTotalDays = previousMonthLastDay.getDate();
        renderPreviousMonthDays(startDay - 1, previousMonthTotalDays);
        renderCurrentMonthDays(totalDays);
        renderNextMonthDays(startDay + totalDays - 1);
    };
    prevMonthButton.addEventListener('click', () => {
        displayedMonth.setMonth(displayedMonth.getMonth() - 1);
        updateMonthDisplay();
    });
    nextMonthButton.addEventListener('click', () => {
        displayedMonth.setMonth(displayedMonth.getMonth() + 1);
        updateMonthDisplay();
    });
    addEventButton.addEventListener('click', () => openModal);
    updateMonthDisplay();
};
