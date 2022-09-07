"use strict";
const button_back = document.querySelector(".button_back");
const userName = document.querySelector(".userName");
userName.innerHTML = getCookie("username");
console.log(getCookie("username"));
button_back.addEventListener("click", () => {
    console.log("back");
    setTimeout(() => {
        window.location.href = "http://localhost:3000/";
        document.cookie = "username = ; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    }, 1000);
});
function getCookie(name) {
    let matches = document.cookie.match(new RegExp("(?:^|; )" +
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
        "=([^;]*)"));
    return matches ? decodeURIComponent(matches[1]) : "";
}
