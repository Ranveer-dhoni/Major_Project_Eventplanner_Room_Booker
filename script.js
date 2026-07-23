let events = JSON.parse(localStorage.getItem("events") || "[]");

function saveEvents() {
    localStorage.setItem("events", JSON.stringify(events));
}

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
}

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

renderEvents();







