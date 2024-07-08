import { loadEventsForCurrentWeek, saveEventToLocalStorage } from './events.js';
import { currentDate } from './header.js';
export function openEventCreationModal() {
    const modal = document.getElementById("eventModal");
    modal.style.display = "block";
}

export function closeEventCreationModal() {
    const modal = document.getElementById("eventModal");
    modal.style.display = "none";
}

export function validateEventForm(event) {
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
        event.preventDefault();
        alert("End date and time must be after start date and time");
    } else {
        const event = {
            title: eventTitle,
            startDateTime: startDateTime.toISOString(),
            endDateTime: endDateTime.toISOString(),
            description: eventDescription
        };
        saveEventToLocalStorage(event);
        loadEventsForCurrentWeek(currentDate);
        closeEventCreationModal();
    }
}

export function initModalEventListeners() {
    const createEventButton = document.querySelector(".add-event-button");
    const closeModalButton = document.getElementById("closeModal");
    const modalOverlay = document.getElementById("eventModal");

    createEventButton.addEventListener('click', openEventCreationModal);
    closeModalButton.addEventListener('click', closeEventCreationModal);

    window.addEventListener('click', function(event) {
        if (event.target === modalOverlay) {
            closeEventCreationModal();
        }
    });
    const eventForm = document.getElementById("eventForm");
    eventForm.addEventListener('submit', validateEventForm);
}
