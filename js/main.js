import { renderCalendarCells, renderWeekHeader } from './calendar.js';
import { initModalEventListeners } from './modal.js';
import { addEventListenersToHeaderButtons} from './header.js';
const currentDate = new Date();
function init() {
    renderCalendarCells();
    initModalEventListeners();
    renderWeekHeader(currentDate);
    addEventListenersToHeaderButtons();
}

init();