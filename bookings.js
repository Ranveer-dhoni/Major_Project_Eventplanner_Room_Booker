let bookings = JSON.parse(localStorage.getItem("bookings") || "[]");

function saveBookings() {
    localStorage.setItem("bookings", JSON.stringify(bookings));
}

function createBooking() {
    const room = document.getElementById("bookingRoom").value.trim();
    const date = document.getElementById("bookingDate").value.trim();
    const reason = document.getElementById("bookingReason").value.trim();

    if (!room || !date) {
        alert("Please fill in room and date");
        return;
    }

    bookings.push({ room, date, reason });
    saveBookings();
    renderBookings();
}

function renderBookings() {
    const list = document.getElementById("bookingList");
    if (!list) return;

    list.innerHTML = "";

    bookings.forEach(b => {
        const li = document.createElement("li");
        li.innerHTML = `
            <strong>${b.room}</strong> — ${b.date}<br>
            <em>${b.reason || "No reason"}</em>
        `;
        list.appendChild(li);
    });
}

renderBookings();


