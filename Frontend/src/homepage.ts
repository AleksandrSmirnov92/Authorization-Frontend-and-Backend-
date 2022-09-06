const button_back = document.querySelector(".button_back")!;
button_back.addEventListener("click", () => {
  console.log("back");
  setTimeout(() => {
    window.location.href = "http://localhost:3000/";
    document.cookie = "username = ; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
  }, 1000);
});
