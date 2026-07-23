// ===============================
// LOAD EVENTS
// ===============================
let events = JSON.parse(localStorage.getItem("events") || "[]");

function saveEvents() {
    localStorage.setItem("events", JSON.stringify(events));
}

// ===============================
// CREATE EVENT
// ===============================
function createEvent() {
    const name = document.getElementById("eventName").value.trim();
    const date = document.getElementById("eventDate").value.trim();
    const description = document.getElementById("eventDescription").value.trim();

    if (!name || !date) {
        alert("Please fill in event name and date");
        return;
    }

    events.push({ name, date, description });
    saveEvents();
    renderEvents();

    // Clear inputs
    document.getElementById("eventName").value = "";
    document.getElementById("eventDate").value = "";
    document.getElementById("eventDescription").value = "";
}

// ===============================
// RENDER EVENTS
// ===============================
function renderEvents() {
    const list = document.getElementById("eventList");
    if (!list) return;

    list.innerHTML = "";

    events.forEach(e => {
        const li = document.createElement("li");
        li.innerHTML = `
            <strong>${e.name}</strong> — ${e.date}<br>
            <em>${e.description || "No description"}</em>
        `;
        list.appendChild(li);
    });
}

// ===============================
// SIMPLE DASHBOARD CALENDAR LIST
// ===============================
function loadCalendar() {
    const calendar = document.getElementById("calendar");
    if (!calendar) return;

    const bookings = JSON.parse(localStorage.getItem("bookings") || "[]");

    calendar.innerHTML = "";

    const combined = [
        ...events.map(e => ({ type: "Event", name: e.name, date: e.date })),
        ...bookings.map(b => ({ type: "Room", name: b.room, date: b.date }))
    ];

    combined.forEach(item => {
        const div = document.createElement("div");
        div.style.padding = "10px";
        div.style.margin = "5px 0";
        div.style.background = "rgba(255,255,255,0.2)";
        div.style.borderRadius = "8px";

        div.textContent = `${item.date} — ${item.type}: ${item.name}`;
        calendar.appendChild(div);
    });
}

// ===============================
// ROLE RESTRICTIONS
// ===============================
function applyRoleRestrictions() {
    const role = localStorage.getItem("role");

    if (role === "student") {
        const eventSection = document.getElementById("teacherEventSection");
        const roomSection = document.getElementById("teacherRoomSection");

        if (eventSection) eventSection.style.display = "none";
        if (roomSection) roomSection.style.display = "none";
    }
}

// ===============================
// AUTO-RUN
// ===============================
renderEvents();
loadCalendar();
applyRoleRestrictions();

