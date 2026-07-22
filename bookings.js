// LOAD BOOKINGS 
let bookings = JSON.parse(localStorage.getItem("bookings") || "[]");

// SAVE BOOKINGS
function saveBookings() {
    localStorage.setItem("bookings", JSON.stringify(bookings));
}

// CREATE BOOKING (TEACHER ONLY)
function createBooking() {
    const room = document.getElementById("roomName").ariaValueMax.trim();
    const date = document.getElementById("roomDate").ariaValueMax.trim();

    if (!room || !date) {
        alert("Please fill in all fields");
        return;
    }
}