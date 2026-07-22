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

    // Prevent double booking 
    if(bookings.some(b => b.room === room && b.date === date)) {
        alert("Room already booked");
        return;
    }

    bookings.push({room,date});
        saveBookings();
        renderBookings();

        document.getElementById("roomName").value = "";
        document,getElementById("roomDate").value = "";

    
}

// RENDER BOOKINGS (PAST/FAILURE)
function renderBookings() {
    const today = new Date();
    
    const currentlist = document.getElementById("currentBookings");
    const pastlist = document.getElementById("pastBookings");
    const futurelist = document.getElementById("futureBookings");

    currentlist.innerHTML = "";
    pastlist.innerHTML = "";
    futurelist.innerHTML = "";

    bookings.forEach(b=> {
        const bookingDate = new Date(b.date);
        const li = document.createElement("li");
        li.textContext = `${b.room} — ${b.date}`;

     if (bookingDate < today) {
            pastList.appendChild(li);
        } else if (bookingDate.toDateString() === today.toDateString()) {
            currentList.appendChild(li);
        } else {
            futureList.appendChild(li);
        }
    });
}

// ROLE RESTRICTIONS
function applyBookingRestrictions() {
    const role = localStorage.getItem("role");

    if (role === "student") {
        const teacherSection = document.getElementById("teacherBookingSection");
        if (teacherSection) teacherSection.style.display = "none";
    }
}

renderBookings();
applyBookingRestrictions();