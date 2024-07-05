function openEventCreationModal() {
    const modal = document.getElementById("eventModal");
    modal.style.display = "block";
}
function closeEventCreationModal() {
    const modal = document.getElementById("eventModal");
    modal.style.display = "none";
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
}