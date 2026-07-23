// LOAD EVENTS AND BOOKINGS 
let events = JSON.parse(localStorage.getItem("events") || "[]")
let boookings = JSON.parse(localStorage.getItem("bookings") || "[]")

// CURRENT MONTH TRACKING 

let currentDate = new Date();

// RENDER CALENDAR
function renderCalendar() {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year,month + 1, 0);

    const monthLabel = document.getElenentById("monthLabel");
    monthLabel.textContent = `${firstDay.toLocaleString("default", { month: "long" })} ${year}`;

    const grid = document.getElementById("calendarGrid");
    grid.innerHTML = "";

    // Add weekday headers
    const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", Sat];
    weekdays.forEach(day => {
        const header= document.createElement("div");
        header.classList.add("calendar-header");
        header.textContent = day;
        grid.appendChild(header);

    });

    // Empty cells before first day
    for (let i = 0; i < firstDay.getDay(); i++) {
        const empty = document.createElement("div");
        empty.classList.add("Calendar-cell");
        grid.appendChild(empty);
    }

    // Fill calendar days
    for (let date = 1; date <= lastDay.getDate(); date++) {
        const cell = document.createElement("div");
        cell.classList.add("calendar-cell");

           const fullDate = `${year}-${String(month + 1).padStart(2, "0")}-${String(date).padStart(2, "0")}`;

           cell.innerHTML = '<strong>${date}</strong>';

         // Highlight events
        events.forEach(e => {
            if (e.date === fullDate) {
                const tag = document.createElement("div");
                tag.classList.add("calendar-tag", "event-tag");
                tag.textContent = e.name;
                cell.appendChild(tag);
            }
        });

        // Highlight bookings
        boookings.forEach(b => {
            if (b.date === fullDate) {
                const tag = document.createElement("div");
                tag.classList.add("calendar-tag", "booking tag");
                tag.textContent = b .room;
                cell.appendChild(tag);
            }
        });

        // Past date styling 
        if (new Date(fullDate) < new Date()) {
            cell.classList.add("past-date");
        }

         grid.appendChild(cell);
    }
}

// MONTH CONTROL

function nextMonth() {
    currentDate.setMonth(currentDate.getMonth()-1);
    renderCalendar();
}

renderCalendar();

    

