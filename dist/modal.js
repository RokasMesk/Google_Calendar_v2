import { loadEventsForCurrentWeek } from './events.js';
import { saveEventToLocalStorage } from './services.js';
import { getFirstDayOfTheWeek, formatHourMinutesForInputForm, addOneHour, generateSimpleID } from './utils.js';
import { renderCalendarCells } from './calendar.js';
export function closeEventDetailsModal() {
    const eventDetailsModal = document.getElementById('eventDetailsModal');
    eventDetailsModal.style.display = 'none';
}
export const initModal = () => {
    const modalOverlay = document.getElementById("eventModal");
    const eventDetailsModal = document.getElementById("eventDetailsModal");
    const openEventCreationModal = (date) => {
        modalOverlay.style.display = "block";
        if (date) {
            const cellDate = new Date(date);
            document.getElementById("startDate").value = date.toISOString().split('T')[0];
            document.getElementById("endDate").value = date.toISOString().split('T')[0];
            document.getElementById("startTime").value = formatHourMinutesForInputForm(cellDate.getHours());
            document.getElementById("endTime").value = addOneHour(cellDate.getHours());
        }
    };
    const closeEventCreationModal = () => {
        modalOverlay.style.display = "none";
    };
    const openModal = (date) => {
        openEventCreationModal(date);
    };
    const clearFormsInputFields = () => {
        document.getElementById("eventTitle").value = '';
        document.getElementById("eventDescription").value = '';
        document.getElementById("startDate").value = '';
        document.getElementById("endDate").value = '';
        document.getElementById("startTime").value = '';
        document.getElementById("endTime").value = '';
    };
    document.querySelector(".add-event-button").addEventListener("click", () => openEventCreationModal());
    document.getElementById("closeModal").addEventListener("click", closeEventCreationModal);
    document.getElementById("closeEventDetailsModal").addEventListener("click", () => {
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
        document.getElementById("endDateError").style.display = 'none';
        if (startDateTime > endDateTime) {
            document.getElementById("endDateError").innerText = "* End date and time must be after start date and time";
            document.getElementById("endDateError").style.display = 'block';
        }
        else {
            const newEvent = {
                id: generateSimpleID(),
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
            const eventFallsInCurrentWeek = startDateTime <= endOfWeek && endDateTime >= startOfWeek;
            if (eventFallsInCurrentWeek) {
                loadEventsForCurrentWeek(currentDate);
            }
            else {
                renderCalendarCells(startDateTime, openModal);
            }
            clearFormsInputFields();
            closeEventCreationModal();
        }
    };
    document.getElementById("eventForm").addEventListener("submit", validateEventForm);
    return { openModal };
};
