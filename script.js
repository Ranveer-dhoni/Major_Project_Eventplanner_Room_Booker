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
