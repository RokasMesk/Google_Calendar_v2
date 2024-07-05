export function renderCalendarCells() {
    document.addEventListener('DOMContentLoaded', () => {
        const calendarCells = document.getElementById('calendarCells');
        const cellsInOneColumn= 19;
        const daysInWeek = 7;
        for (let i = 0; i < cellsInOneColumn * daysInWeek; i++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            calendarCells.appendChild(cell);
        }
    });
}