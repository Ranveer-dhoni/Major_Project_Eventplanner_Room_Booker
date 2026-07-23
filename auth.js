function checkAccess() {
    const role = localStorage.getItem("role");

    // allow page to load before redirect
    setTimeout(() => {
        if (!role) {
            location.href = "index.html";
        }
    }, 10);
}

    window.location.href = "index.html";



