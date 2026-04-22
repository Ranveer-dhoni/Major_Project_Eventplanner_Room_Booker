// JS file initialised
console.log("Script loaded");

function encyrpt(text) {
    let result = "";
    for (let i = 0; < text.length; i++) {
        result += String.fromCharCode(text.CharCode(i) + 3);
    }
    return result;
}

localStorage.setItem("teacherUser", "teacher");
localStorage.setItem("teacherPass", encrypt("password123"));

function login() {
    let user = document.getElementById("username").value;
    let pass = encrypt(document.getElementById("password").value);

    if (user === localStorage.getItem("teacherUser")&&
        pass === localStorage.getItem("teacherPass")) {
       window.location.href = "dashboard.html";
        } else {
          alert("Incorrect login");
        }
    }

function createEvent() {
    let name = document.getElementById("eventName").value;
    let date = document.getElementById("eventDate").value;

    let events = JSON.parse(localStorage.getItem("events") ||"[]");
    events.push({name,date});
    localStorage.setItem("events", JSON.stringify(events));

    loadEvents();
}

function loadEvents() {
    let list = document.getElementById("eventList");
    if (!list) return;

    list.innerHTML = "";
    let events = JSON.parse(localStorage.getItem("events")|| "[]");

    for (let e of events) {
        let item = document.createElement("li");
        item.textContent = `${e.name}-${e.date}`;
        list.appendChild(item)
    }
}

function bookRoom() {
    let room = document.getElementById("roomName").value;
    let date = document.getElementById("roomDate").value;

    let bookings = JSON.parse(localStorage.getItem("bookings") || "[]");

    for (let b of bookings) {
        if (b.room === room && b.date === data) {
            alert("Room already booked");
            return;
        }
    }
    bookings.push({room,date});
    localStorage.setItem("bookings", JSON.stringify(bookings));

    loadBookings();
}

function loadBookings() {
    let list = document.getElementById("roomList");
    if (!list) return;

    list.innerHTML = "";
    let bookings = JSON.parse(localStorage.getItem("bookings") || "[]");

    for (let b of bookings) {
        let item = document.createElement("li");
        item.textContent = `$ {b.room} - ${b.date}`;
        list.appendChild(item);
    }
}

loadEvents()
loadBookings()