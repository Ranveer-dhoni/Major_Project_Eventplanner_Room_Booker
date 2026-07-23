// =========================================================
// USER DATABASE
// =========================================================

const users = [
    { username: "teacher", password: "1234", role: "teacher" },
    { username: "student", password: "1234", role: "student" }
];

// =========================================================
// SIMPLE ENCRYPTION (Caesar shift)
// =========================================================

function encrypt(text) {
    let result = "";
    for (let i = 0; i < text.length; i++) {
        result += String.fromCharCode(text.charCodeAt(i) + 3);
    }
    return result;
}

function decrypt(text) {
    let result = "";
    for (let i = 0; i < text.length; i++) {
        result += String.fromCharCode(text.charCodeAt(i) - 3);
    }
    return result;
}

// =========================================================
// LOGIN SYSTEM
// =========================================================

function loginUser() {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!username || !password) {
        alert("Please enter both username and password");
        return;
    }

    const encryptedPassword = encrypt(password);

    const user = users.find(
        u => u.username === username && encrypt(u.password) === encryptedPassword
    );

    if (!user) {
        alert("Invalid username or password");
        return;
    }

    localStorage.setItem("loggedInUser", user.username);
    localStorage.setItem("role", user.role);

    window.location.href = "home.html";
}

// =========================================================
// ACCESS CONTROL
// =========================================================

function checkAccess() {
    const user = localStorage.getItem("loggedInUser");
    const role = localStorage.getItem("role");

    if (!user || !role) {
        window.location.href = "index.html";
    }
}
