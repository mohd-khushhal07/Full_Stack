// Get button and body
const themeToggle = document.getElementById("themeToggle");
const body = document.body;

// Check if a theme is saved in localStorage
if (localStorage.getItem("theme") === "light") {
  body.classList.add("light-theme");
}

// Toggle theme on button click
themeToggle.addEventListener("click", () => {
  body.classList.toggle("light-theme");

  // Save preference to localStorage
  if (body.classList.contains("light-theme")) {
    localStorage.setItem("theme", "light");
  } else {
    localStorage.setItem("theme", "dark");
  }
});
