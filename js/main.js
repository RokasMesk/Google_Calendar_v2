import { renderHeader } from './header.js';
import { renderAside } from './aside.js';
import { renderCalendarCells } from './calendar.js';
import { initModal } from './modal.js';

const init = () => {
  let currentDate = new Date();
  const { openModal } = initModal();

  const updateDate = (newDate) => {
    if (newDate.toDateString() === currentDate.toDateString()) {
      return;
    }
    currentDate = newDate;
    renderHeader(newDate, updateDate);
    renderCalendarCells(newDate);
  };

  renderHeader(currentDate, updateDate);
  renderAside(openModal);
  renderCalendarCells(currentDate);
};

init();
