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