import { loadEventsForCurrentWeek } from './events.js';
import { saveEventToServer } from './services.js'
import { getFirstDayOfTheWeek,formatHourMinutesForInputForm, addOneHour, generateSimpleID } from './utils.js';
import { renderCalendarCells } from './calendar.js';

export function closeEventDetailsModal(): void {
  const eventDetailsModal = document.getElementById('eventDetailsModal') as HTMLElement;
  eventDetailsModal.style.display = 'none';
}
export const initModal = (): { openModal: (date?: Date) => void } => {
  const modalOverlay = document.getElementById("eventModal") as HTMLElement;
  const eventDetailsModal = document.getElementById("eventDetailsModal") as HTMLElement;
 
  const openEventCreationModal = (date?: Date): void => {
    modalOverlay.style.display = "block";
  
    if (date){
      const cellDate = new Date(date);
      (document.getElementById("startDate") as HTMLInputElement).value = date.toISOString().split('T')[0];
      (document.getElementById("endDate") as HTMLInputElement).value = date.toISOString().split('T')[0];
      (document.getElementById("startTime") as HTMLInputElement).value = formatHourMinutesForInputForm(cellDate.getHours());
      (document.getElementById("endTime") as HTMLInputElement).value = addOneHour(cellDate.getHours());
    }
  };
  
  const closeEventCreationModal = (): void => {
    modalOverlay.style.display = "none";
  };

  const openModal = (date?:Date): void => {
    openEventCreationModal(date);
  };
  const clearFormsInputFields = (): void => {
    (document.getElementById("eventTitle") as HTMLInputElement).value = '';
    (document.getElementById("eventDescription") as HTMLInputElement).value = '';
    (document.getElementById("startDate") as HTMLInputElement).value = '';
    (document.getElementById("endDate") as HTMLInputElement).value = '';
    (document.getElementById("startTime") as HTMLInputElement).value = '';
    (document.getElementById("endTime") as HTMLInputElement).value = '';
  }

  (document.querySelector(".add-event-button") as HTMLElement).addEventListener("click", () => openEventCreationModal());
  (document.getElementById("closeModal") as HTMLElement).addEventListener("click", closeEventCreationModal);

  (document.getElementById("closeEventDetailsModal") as HTMLElement).addEventListener("click", () => {
    closeEventDetailsModal();
  });

  window.addEventListener("click", function (event) {
    if (event.target === modalOverlay) {
      closeEventCreationModal();
    }
    if (event.target === eventDetailsModal) {
      closeEventDetailsModal();
    }
  });

  const validateEventForm = async (event: Event): Promise<void> => {
    event.preventDefault();
    const eventTitle = (document.getElementById("eventTitle") as HTMLInputElement).value;
    const startDate = (document.getElementById("startDate") as HTMLInputElement).value;
    const endDate = (document.getElementById("endDate") as HTMLInputElement).value;
    const startTime = (document.getElementById("startTime") as HTMLInputElement).value;
    const endTime = (document.getElementById("endTime") as HTMLInputElement).value;
    const eventDescription = (document.getElementById("eventDescription") as HTMLInputElement).value;

    const startDateTime = new Date(`${startDate}T${startTime}`);
    const endDateTime = new Date(`${endDate}T${endTime}`);

    (document.getElementById("endDateError") as HTMLElement).style.display = 'none';

    if (startDateTime > endDateTime) {
      (document.getElementById("endDateError") as HTMLElement).innerText = "* End date and time must be after start date and time";
      (document.getElementById("endDateError") as HTMLElement).style.display = 'block';
    } else {
      const newEvent = {
        id: generateSimpleID(),
        title: eventTitle,
        startDateTime: startDateTime.toISOString(),
        endDateTime: endDateTime.toISOString(),
        description: eventDescription,
      };
      await saveEventToServer(newEvent);

      const currentDate = new Date();
      const startOfWeek = getFirstDayOfTheWeek(currentDate);
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);
      endOfWeek.setHours(23, 59, 59, 999);

      const eventFallsInCurrentWeek = startDateTime <= endOfWeek && endDateTime >= startOfWeek;

      if (eventFallsInCurrentWeek) {
        loadEventsForCurrentWeek(currentDate);
      } else {
        renderCalendarCells(startDateTime, openModal);
      }
      clearFormsInputFields();
      closeEventCreationModal();
    }
  };

  (document.getElementById("eventForm") as HTMLElement).addEventListener("submit", validateEventForm);

  return { openModal };
};
