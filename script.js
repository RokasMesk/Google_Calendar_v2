document.addEventListener('DOMContentLoaded', () => {
    const calendarCells = document.getElementById('calendarCells');
    const hoursInDay = 19;
    const daysInWeek = 7;
    for (let i = 0; i < hoursInDay * daysInWeek; i++) {
        const cell = document.createElement('div');
        cell.className = 'cell';
        calendarCells.appendChild(cell);
    }
});