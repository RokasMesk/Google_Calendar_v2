import { renderCalendarCells } from './calendar.js';
import { initModalEventListeners } from './modal.js';

function init() {
    renderCalendarCells();
    initModalEventListeners();
}

init();