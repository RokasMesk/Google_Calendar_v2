function openEventCreationModal() {
    const modal = document.getElementById("eventModal");
    modal.style.display = "block";
}
function closeEventCreationModal() {
    const modal = document.getElementById("eventModal");
    modal.style.display = "none";
}
function validateEventForm(event) {
    const startDate = document.getElementById("startDate").value;
    const endDate = document.getElementById("endDate").value;
    const startTime = document.getElementById("startTime").value;
    const endTime = document.getElementById("endTime").value;
    const startDateTime = new Date(`${startDate}T${startTime}`);
    const endDateTime = new Date(`${endDate}T${endTime}`);

    if (startDateTime > endDateTime) {
        event.preventDefault();
        alert("End date and time must be after start date and time");
    }

}
export function initModalEventListeners() {
    const createEventButton = document.querySelector(".add-event-button");
    const closeModalButton = document.getElementById("closeModal")
    const modalOverlay = document.getElementById("eventModal");

    createEventButton.addEventListener('click', openEventCreationModal);
    closeModalButton.addEventListener('click', closeEventCreationModal);

    window.addEventListener('click', function(event) {
        if (event.target === modalOverlay) {
            closeEventCreationModal();
        }
    });
    const eventForm = document.getElementById("eventForm");
    eventForm.addEventListener('submit', validateEventForm)
}