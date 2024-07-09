import { saveEventToLocalStorage, loadEventsForCurrentWeek } from './events.js';
import { getFirstDayOfTheWeek } from './utils.js';
export const initModal = () => {
  const modal = document.getElementById("eventModal");
  const eventDetailsModal = document.getElementById("eventDetailsModal");

  const openEventCreationModal = () => {
    modal.style.display = "block";
  };

  const closeEventCreationModal = () => {
    modal.style.display = "none";
  };

  const openModal = (date) => {
    //kai reikes jeigu reikes
    openEventCreationModal();
  };

  document.querySelector(".add-event-button").addEventListener("click", openEventCreationModal);
  document.getElementById("closeModal").addEventListener("click", closeEventCreationModal);

  document.getElementById("closeEventDetailsModal").addEventListener("click", () => {
    eventDetailsModal.style.display = "none";
  });

  window.addEventListener("click", function (event) {
    if (event.target === modal) {
      closeEventCreationModal();
    }
    if (event.target === eventDetailsModal) {
      eventDetailsModal.style.display = "none";
    }
  });

  const validateEventForm = (event) => {
    event.preventDefault();
    const eventTitle = document.getElementById("eventTitle").value;
    const startDate = document.getElementById("startDate").value;
    const endDate = document.getElementById("endDate").value;
    const startTime = document.getElementById("startTime").value;
    const endTime = document.getElementById("endTime").value;
    const eventDescription = document.getElementById("eventDescription").value;

    const startDateTime = new Date(`${startDate}T${startTime}`);
    const endDateTime = new Date(`${endDate}T${endTime}`);

    if (startDateTime > endDateTime) {
      alert("End date and time must be after start date and time");
    } else {
      const newEvent = {
        title: eventTitle,
        startDateTime: startDateTime.toISOString(),
        endDateTime: endDateTime.toISOString(),
        description: eventDescription,
      };
      saveEventToLocalStorage(newEvent);

      const currentDate = new Date();
      const startOfWeek = getFirstDayOfTheWeek(currentDate);
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);
      endOfWeek.setHours(23, 59, 59, 999);

      if (startDateTime <= endOfWeek && endDateTime >= startOfWeek) {
        loadEventsForCurrentWeek(currentDate);
      }
      
      closeEventCreationModal();
    }
  };

  document.getElementById("eventForm").addEventListener("submit", validateEventForm);

  return { openModal };
};
