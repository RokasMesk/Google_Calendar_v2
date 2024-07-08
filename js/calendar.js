export function renderCalendarCells(loadEventsCallback) {
    document.addEventListener('DOMContentLoaded', () => {
        const calendarCells = document.getElementById('calendarCells');
        const cellsInOneColumn= 19;
        const daysInWeek = 7;
        for (let i = 0; i < cellsInOneColumn * daysInWeek; i++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            calendarCells.appendChild(cell);
        }
        if (typeof loadEventsCallback === 'function') {
            loadEventsCallback();
        }
    });
}
export function getStartOfWeek(date) {
    const day = date.getDay(); 
    const diff = date.getDate() - day + (day === 0 ? -6 : 1); 
    return new Date(date.setDate(diff));
}
function isToday(date) {
    const today = new Date();
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear();
}
export function renderWeekHeader(dateToRender) {
    const weekHeader = document.querySelector('.week-header');
    weekHeader.innerHTML='';
    const startOfWeek = getStartOfWeek(dateToRender);
    const wholeWeekHeader = document.createElement('div');
    wholeWeekHeader.className = 'day'
    for (let i = 0; i < 7; i++) {
        const day = new Date(startOfWeek);
        day.setDate(day.getDate() + i);
        const dayName = day.toLocaleDateString('en-US', { weekday: 'short' });
        const dayHeader = document.createElement('div');
        dayHeader.className = 'day';
        dayHeader.innerHTML = `<span class='day-name'>${dayName}</span><span class="day-number">${day.getDate()}</span>`;
        if (isToday(day)) {
            dayHeader.classList.add('current-day');
        }
        weekHeader.appendChild(dayHeader);
    }
}