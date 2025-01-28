const themeToggle = document.getElementById("theme-toggle");
const body = document.body;
const sortButton = document.getElementById("sort");


const sortInputArray = (event) => {
    event.preventDefault();
    const inputValues = [...document.getElementsByClassName("values-dropdown")].map((dropdown) => Number(dropdown.value));
    updateUI(inputValues)

}

const updateUI = (array = []) => {
    array.forEach((num, i )=> {
        const outputValueNode = document.getElementById(`output-value-${i}`);
        outputValueNode.innerText = num;

    });

}

sortButton.addEventListener("click", sortInputArray)































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
