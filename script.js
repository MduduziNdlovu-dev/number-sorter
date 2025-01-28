const themeToggle = document.getElementById("theme-toggle");
const body = document.body;
const sortButton = document.getElementById("sort");


const sortInputArray = (event) => {
    event.preventDefault();
    const inputValues = [...document.getElementsByClassName("values-dropdown")].map((dropdown) => Number(dropdown.value));
    const sortedValues = bubbleSort(inputValues);
    updateUI(inputValues);

}

const updateUI = (array = []) => {
    array.forEach((num, i )=> {
        const outputValueNode = document.getElementById(`output-value-${i}`);
        outputValueNode.innerText = num;

    });

}

const bubbleSort = (array) => {
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length - 1; j++) {
            console.log(array , array[j], array[j+1])
            if (array[j]> array[j+1]) {
                const temp = array[j];
                array[j] = array[j+1];
                array[j+1] = temp;
            }
        }
    }
    return array
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
