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
    window.location.replace("https://ranveer-dhoni.github.io/Major_Project_Eventplanner_Room_Booker/dashboard.html");
  } else {
    alert("Incorrect login");
  }
}



// ----- EVENTS -----

function createEvent() {
  let name = document.getElementById("eventName").value;
  let date = document.getElementById("eventDate").value;

  if (!name || !date) {
    alert("Please fill in all fields");
    return;
  }

  let events = JSON.parse(localStorage.getItem("events") || "[]");
  events.push({ name, date });
  localStorage.setItem("events", JSON.stringify(events));

  loadEvents();
}

function loadEvents() {
  let list = document.getElementById("eventList");
  if (!list) return;

  list.innerHTML = "";
  let events = JSON.parse(localStorage.getItem("events") || "[]");

  for (let e of events) {
    let li = document.createElement("li");
    li.textContent = `${e.name} — ${e.date}`;
    list.appendChild(li);
  }
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
  let calendar = document.getElementById("calendar");
  if (!calendar) return;

  let events = JSON.parse(localStorage.getItem("events") || "[]");
  let bookings = JSON.parse(localStorage.getItem("bookings") || "[]");

  calendar.innerHTML = "";

  let combined = [
    ...events.map(e => ({ type: "Event", name: e.name, date: e.date })),
    ...bookings.map(b => ({ type: "Room", name: b.room, date: b.date }))
  ];

  combined.forEach(item => {
    let div = document.createElement("div");
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


