const themeToggle = document.getElementById("theme-toggle");
const body = document.body;
const sortButton = document.getElementById("sort");
const algorithmSelect = document.getElementById("algorithm-select");
const algorithmInfo = document.getElementById("algorithm-info");


const sortInputArray = (event) => {
    event.preventDefault();
    const selectedAlgorithm = algorithmSelect.value;
    const inputValues = [...document.getElementsByClassName("values-dropdown")].map((dropdown) => Number(dropdown.value));

    let sortedValues;
    switch (selectedAlgorithm) {
        case "bubbleSort":
          sortedValues = bubbleSort(inputValues);
          break;
        case "selectionSort":
          sortedValues = selectionSort(inputValues);
          break;
        case "insertionSort":
          sortedValues = insertionSort(inputValues);
          break;
        default:
          sortedValues = inputValues;
      }    
      
      updateUI(sortedValues);
      displayAlgorithmInfo(selectedAlgorithm);

}

const displayAlgorithmInfo = (algorithm) => {
    let info = "";
    switch (algorithm) {
      case "bubbleSort":
        info = `
          <h3>Bubble Sort</h3>
          <p>Bubble Sort is a simple comparison-based algorithm. It repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order. This process continues until the list is sorted.</p>
          <p><strong>Time Complexity:</strong> O(n²)</p>
          <p><strong>Space Complexity:</strong> O(1)</p>
        `;
        break;
      case "selectionSort":
        info = `
          <h3>Selection Sort</h3>
          <p>Selection Sort works by repeatedly finding the minimum element from the unsorted part of the list and swapping it with the first unsorted element. It continues until the entire list is sorted.</p>
          <p><strong>Time Complexity:</strong> O(n²)</p>
          <p><strong>Space Complexity:</strong> O(1)</p>
        `;
        break;
      case "insertionSort":
        info = `
          <h3>Insertion Sort</h3>
          <p>Insertion Sort builds the final sorted array one element at a time. It takes each element from the unsorted portion and places it in its correct position in the sorted portion.</p>
          <p><strong>Time Complexity:</strong> O(n²)</p>
          <p><strong>Space Complexity:</strong> O(1)</p>
        `;
        break;
      default:
        info = "<p>No sorting algorithm selected.</p>";
    }
    
    algorithmInfo.innerHTML = info;
  };

const updateUI = (array = []) => {
    array.forEach((num, i) => {
      const outputValueNode = document.getElementById(`output-value-${i}`);
      outputValueNode.innerText = num;
    });
  };

const bubbleSort = (array) => {
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length - 1; j++) {
            if (array[j]> array[j+1]) {
                const temp = array[j];
                array[j] = array[j+1];
                array[j+1] = temp;
            }
        }
    }
    return array
}

const selectionSort = (array) => {
    for (let i = 0; i < array.length; i++) {
      let minIndex = i;
  
      for (let j = i + 1; j < array.length; j++) {
        if(array[j] < array[minIndex]){
          minIndex = j;
        }
      }
      const temp = array[i];
      array[i] = array[minIndex];  
      array[minIndex] = temp;
    }
    return array;
  }

const insertionSort = (array) => {
    for(let i = 1 ; i < array.length ; i++){
        const currValue = array[i];
        let j = i - 1 ;
        while( j >= 0 && array[j] > currValue){
            array[j + 1] =array[j];
            j--;
        }
        array[j + 1] = currValue
    }
    return array;

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
