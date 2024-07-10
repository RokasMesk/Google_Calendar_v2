import { renderHeader } from './header.js';
import { renderAside } from './aside.js';
import { renderCalendarCells } from './calendar.js';
import { initModal } from './modal.js';
import { areTwoDatesEqual } from './utils.js';

const init = () => {
  let currentDate = new Date();
  const { openModal } = initModal();

  const updateDate = (newDate) => {
    if (areTwoDatesEqual(newDate, currentDate)) {
      return;
    }
    currentDate = newDate;
    renderHeader(newDate, updateDate);
    renderCalendarCells(newDate, openModal);
  };

  renderHeader(currentDate, updateDate);
  renderAside(openModal);
  renderCalendarCells(currentDate, openModal);
};

init();
