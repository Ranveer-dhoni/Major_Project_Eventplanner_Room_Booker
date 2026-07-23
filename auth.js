function checkAccess() {
    const role = localStorage.getItem("role");

    if (!role) {
        location.href = "index.html";
        return;
    }

    // Teacher/student restrictions (your old logic)
    if (location.pathname.includes("dashboard.html")) {
        if (role === "student") {
            const eventSection = document.getElementById("teacherEventSection");
            if (eventSection) eventSection.style.display = "none";
        }
    }

    if (location.pathname.includes("bookings.html")) {
        if (role === "student") {
            const bookingSection = document.getElementById("teacherBookingSection");
            if (bookingSection) bookingSection.style.display = "none";
        }
    }
}







