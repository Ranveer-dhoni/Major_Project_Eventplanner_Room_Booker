let events = JSON.parse(localStorage.getItem("events") || "[]");

function saveEvents() {
    localStorage.setItem("events", JSON.stringify(events));
}

function renderAllEvents() {
    const list = document.getElementById("eventsList");
    if (!list) return;

    list.innerHTML = "";

    events.forEach((e, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
            <strong>${e.name}</strong> — ${e.date}<br>
            <em>${e.description || "No description"}</em><br><br>
            <button onclick="deleteEvent(${index})">Delete</button>
        `;
        list.appendChild(li);
    });
}

function deleteEvent(index) {
    events.splice(index, 1);
    saveEvents();
    renderAllEvents();
}

renderAllEvents();


