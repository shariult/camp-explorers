const alert = document.querySelector(".alert");
document.addEventListener("scroll", () => {
  setTimeout(() => {
    alert.style.display = "none";
  }, 2000);
});
