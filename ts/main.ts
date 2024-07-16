import { renderHeader } from './header.ts';
import { renderAside } from './aside.ts';
import { renderCalendarCells } from './calendar.ts';
import { initModal } from './modal.ts';
import { areTwoDatesEqual } from './utils.ts';

const init = (): void => {
  let currentDate = new Date();
  const { openModal } = initModal();

  const updateDate = (newDate: Date) => {
    if (areTwoDatesEqual(newDate, currentDate)) {
      return;
    }
    currentDate = newDate;
    renderHeader(newDate, updateDate);
    renderCalendarCells(newDate, openModal);
    renderAside(newDate, updateDate, openModal); 
  };

  renderHeader(currentDate, updateDate);
  renderAside(currentDate, updateDate, openModal);
  renderCalendarCells(currentDate, openModal);
};

init();
