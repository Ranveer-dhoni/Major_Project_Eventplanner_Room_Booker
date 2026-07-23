// LOAD EVENTS
let events = JSON.parse(localStorage.getItem("events") || "[]");

// SAVE EVENTS
function saveEvents() {
    localStorage.setItem("events", JSON.stringify(events))
}

// DELETE THE EVENT (Teacher only)
function deleteEvent(index) {
    events.splice(index,1);
    saveEvents();
    renderEvents();

    // RENDER EVENTS 

    function renderEvents() {
        const list = document.getElementById("eventslist");
        list.innerHTML = "";

        events.forEach((e, index) =>{
            const li = document.createElement("li");
            li.classList.add("event-card");

            li.innerHTML = `
            <strong>${e.name}</strong><br>
            ${e.date}<br>
            <em>${e.description || "No description provided"}</em>
        `;

        // Teacher-only delete button
        if (localStorage.getItem("role") === "teacher") {
            const delBtn = document.createElement("button");
            delBtn.textContent ="Delete";
            delBtn.classList.add("nav-btn");
            delBtn.onclick = () => deleteEvent(index);
            li.appendChild(delBtn);
        }
            list.appendChild(li);
        });
    }
}

// ROLE RESTRICTIONS

function applyEventRestrictions() {
    const role = localStorage.getItem("role");

    if (role === "student") {
        const tools= document.getElementById("teacherEventTools");
        if (tools) tools.style.display = "none";
    }
}

// AUTO RUN
renderEvents();
applyEventRestrictions();