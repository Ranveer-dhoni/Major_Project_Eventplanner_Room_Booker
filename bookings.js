// ===============================
// LOAD BOOKINGS
// ===============================
let bookings = JSON.parse(localStorage.getItem("bookings") || "[]");

function saveBookings() {
    localStorage.setItem("bookings", JSON.stringify(bookings));
}

// ===============================
// CREATE BOOKING (Teacher only)
// ===============================
function createBooking() {
    const room = document.getElementById("roomName").value.trim();
    const date = document.getElementById("roomDate").value.trim();

    if (!room || !date) {
        alert("Please fill in all fields");
        return;
    }

    for (let b of bookings) {
        if (b.room === room && b.date === date) {
            alert("Room already booked!");
            return;
        }
    }

    bookings.push({ room, date });
    saveBookings();
    renderBookings();

    document.getElementById("roomName").value = "";
    document.getElementById("roomDate").value = "";
}

// ===============================
// RENDER BOOKINGS (past/future)
// ===============================
function renderBookings() {
    const pastList = document.getElementById("pastBookings");
    const futureList = document.getElementById("futureBookings");

    pastList.innerHTML = "";
    futureList.innerHTML = "";

    const today = new Date().toISOString().split("T")[0];

    bookings.forEach(b => {
        const li = document.createElement("li");
        li.textContent = `${b.room} — ${b.date}`;

        if (b.date < today) {
            pastList.appendChild(li);
        } else {
            futureList.appendChild(li);
        }
    });
}

// ===============================
// ROLE RESTRICTIONS
// ===============================
function applyBookingRestrictions() {
    const role = localStorage.getItem("role");

    if (role === "student") {
        const section = document.getElementById("teacherBookingSection");
        if (section) section.style.display = "none";
    }
}

// ===============================
// AUTO-RUN
// ===============================
renderBookings();
applyBookingRestrictions();
