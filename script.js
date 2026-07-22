
// Simple Caesar cipher encryption
function encrypt(text) {
  let result = "";
  for (let i = 0; i < text.length; i++) {
    result += String.fromCharCode(text.charCodeAt(i) + 3);
  }
  return result;
}

// ----- LOGIN SETUP -----

// Default login:
// Username: teacher
// Password: password123
if (!localStorage.getItem("teacherUser")) {
  localStorage.setItem("teacherUser", "teacher");
  localStorage.setItem("teacherPass", encrypt("password123"));
}

function login() {
  let user = document.getElementById("username").value;
  let pass = encrypt(document.getElementById("password").value);

  if (
    user === localStorage.getItem("teacherUser") &&
    pass === localStorage.getItem("teacherPass")
  ) {
    // FULL ABSOLUTE URL — this bypasses ALL redirect issues
    window.location.replace("home.html");
  } else {
    alert("Incorrect login");
  }
}

// ROLE-BASED UI CONTROL

function applyRoleRestrictions() {
  const role =localStorage.getItem("role");

  // if student, hide teacher-only sections
  if (role === "student") {
    const eventSection = document.getElementById("teacherEventSection");
    const roomSection = document.getElementById("teacherRoomSection");

    if (eventSection) eventSection.style.display = "none";
    if (roomSection) roomSection.style.display = "none";
    
  }



// ----- EVENTS -----

let events = JSON.parse(localStorage.getItem("events")|| "[]");

function saveEvents() {
  localStorage.setItem("events", JSON.stringify(events));
}

function createEvent() {
  let name = document.getElementById("eventName").value;
  let date = document.getElementById("eventDate").value;
  let description = document.getElementById("eventDescription").value.trim();


  if (!name || !date) {
    alert("Please fill in all fields");
    return;
  }
events.push({name,date,description});
saveEvents();
renderEvents();

document.getElementById("eventName").value = "";
document.getElementById("eventDate").value = "";
document.getElementById("eventDescrption").value = "";
}

function renderEvents() {
  let list = document.getElementById("eventList");
  if (!list) return;

  list.innerHTML = "";

  events.forEach(e => {
    let li = document.createElement("li");
    li.innerHTML = `
      <strong>${e.name}</strong> — ${e.date}<br>
      <em>${e.description || "No description provided"}</em>
    `;
    list.appendChild(li);
  });
}

function loadEvents() {
  renderEvents();
}


// ----- ROOM BOOKINGS -----

function bookRoom() {
  let room = document.getElementById("roomName").value;
  let date = document.getElementById("roomDate").value;

  if (!room || !date) {
    alert("Please fill in all fields");
    return;
  }

  let bookings = JSON.parse(localStorage.getItem("bookings") || "[]");

  for (let b of bookings) {
    if (b.room === room && b.date === date) {
      alert("Room already booked!");
      return;
    }
  }

  bookings.push({ room, date });
  localStorage.setItem("bookings", JSON.stringify(bookings));

  loadBookings();
}

function loadBookings() {
  let list = document.getElementById("roomList");
  if (!list) return;

  list.innerHTML = "";
  let bookings = JSON.parse(localStorage.getItem("bookings") || "[]");

  for (let b of bookings) {
    let li = document.createElement("li");
    li.textContent = `${b.room} — ${b.date}`;
    list.appendChild(li);
  }
}

function loadCalendar() {
  const calendar = document.getElementById("calendar");
  if (!calendar) return;

  const events = JSON.parse(localStorage.getItem("events") || "[]");
  const bookings = JSON.parse(localStorage.getItem("bookings") || "[]");

  calendar.innerHTML = ""; // clear old items

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




// Auto-run on dashboard

loadEvents();
loadBookings();
loadCalendar();
applyRoleRestrictions();


