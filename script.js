function renderCalendarCells() {
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
function openEventCreationModal() {
    const modal = document.getElementById("eventModal");
    modal.style.display = "block";
}
function closeEventCreationModal() {
    const modal = document.getElementById("eventModal");
    modal.style.display = "none";
}
function initEventListeners() {
    const btn = document.querySelector(".add-event-button");
    const span = document.getElementsByClassName("close")[0];
    const modal = document.getElementById("eventModal");

    btn.addEventListener('click', openEventCreationModal);
    span.addEventListener('click', closeEventCreationModal);

    window.addEventListener('click', function(event) {
        if (event.target == modal) {
            closeEventCreationModal();
        }
    });
}
function init() {
    renderCalendarCells();
    initEventListeners();
}

init();