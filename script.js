const themeToggle = document.getElementById("theme-toggle");
const body = document.body;

// Load saved theme from localStorage
const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  body.classList.toggle("dark", savedTheme === "dark");
  themeToggle.textContent = savedTheme === "dark" ? "☀️" : "🌙";
}

// Toggle dark mode
themeToggle.addEventListener("click", () => {
  const isDarkMode = body.classList.toggle("dark");
  themeToggle.textContent = isDarkMode ? "☀️" : "🌙";
  localStorage.setItem("theme", isDarkMode ? "dark" : "light");
});
