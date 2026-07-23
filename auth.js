function checkAccess() {
    const role = localStorage.getItem("role");
    if (!role) {
        location.href = "index.html";
        return;
    }
}






