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

        case 'quick':
            sortedValues = quickSort(inputValues);
            break;
        case 'merge':
            sortedValues = mergeSort(inputValues);
            break;
        case 'heap':
            sortedValues = heapSort(inputValues);
            break;
        case 'radix':
            sortedValues = radixSort(inputValues);
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
        case 'quick':
            info = `
                <h3>Quick Sort</h3>
                <p><strong>Time Complexity:</strong> Best: O(n log n), Worst: O(n²)</p>
                <p><strong>Space Complexity:</strong> O(log n)</p>
                <p><strong>Explanation:</strong> Quick Sort is a divide-and-conquer algorithm that selects a pivot and partitions the array into two sub-arrays. It then recursively sorts these sub-arrays. It's fast on average but can degrade to O(n²) with poor pivot selection.</p>
            `;
            break;
        case 'merge':
            info = `
                <h3>Merge Sort</h3>
                <p><strong>Time Complexity:</strong> Best: O(n log n), Worst: O(n log n)</p>
                <p><strong>Space Complexity:</strong> O(n)</p>
                <p><strong>Explanation:</strong> Merge Sort is a divide-and-conquer algorithm that divides the array into two halves, recursively sorts them, and merges them. It guarantees O(n log n) time complexity and is stable.</p>
            `;
            break;
        case 'heap':
            info = `
                <h3>Heap Sort</h3>
                <p><strong>Time Complexity:</strong> Best: O(n log n), Worst: O(n log n)</p>
                <p><strong>Space Complexity:</strong> O(1)</p>
                <p><strong>Explanation:</strong> Heap Sort uses a binary heap to repeatedly extract the maximum element and place it at the end of the array. It guarantees O(n log n) time complexity and works in-place.</p>
            `;
            break;
        case 'radix':
            info = `
                <h3>Radix Sort</h3>
                <p><strong>Time Complexity:</strong> Best: O(nk), Worst: O(nk)</p>
                <p><strong>Space Complexity:</strong> O(n)</p>
                <p><strong>Explanation:</strong> Radix Sort is a non-comparative sorting algorithm that sorts numbers by processing each digit individually. It's efficient for large datasets with small ranges of values, but its performance depends on the number of digits.</p>
            `;
            break;
        default:
            info = '';
            break;
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

const quickSort = ( array) => {
    if (array.length <= 1) return array;

    const pivot = array[array.length - 1];
    const left = [];
    const right = [];

    for (let i = 0; i < array.length - 1; i++) {
        if (array[i] < pivot) left.push(array[i]);
        else right.push(array[i]);
    }

    return [...quickSort(left), pivot, ...quickSort(right)];
}

const mergeSort = (array) => {
    if (array.length <= 1) return array;

    const mid = Math.floor(array.length / 2);
    const left = array.slice(0, mid);
    const right = array.slice(mid);

    return merge(mergeSort(left), mergeSort(right));
}

const merge = (left, right) => {
    let result = [];
    let leftIndex = 0;
    let rightIndex = 0;

    while (leftIndex < left.length && rightIndex < right.length) {
        if (left[leftIndex] < right[rightIndex]) {
            result.push(left[leftIndex]);
            leftIndex++;
        } else {
            result.push(right[rightIndex]);
            rightIndex++;
        }
    }

    return result.concat(left.slice(leftIndex), right.slice(rightIndex));
}

const heapSort = (array) => {
    const heapify = (arr, n, i) => {
        let largest = i;
        const left = 2 * i + 1;
        const right = 2 * i + 2;

        if (left < n && arr[left] > arr[largest]) largest = left;
        if (right < n && arr[right] > arr[largest]) largest = right;

        if (largest !== i) {
            [arr[i], arr[largest]] = [arr[largest], arr[i]]; // Swap
            heapify(arr, n, largest);
        }
    };

    const n = array.length;

    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        heapify(array, n, i);
    }

    for (let i = n - 1; i > 0; i--) {
        [array[0], array[i]] = [array[i], array[0]]; // Swap
        heapify(array, i, 0);
    }

    return array;
}

const getMax = (array) => Math.max(...array);

const countSort = (array, exp) => {
    const output = new Array(array.length);
    const count = new Array(10).fill(0);

    // Count occurrences
    for (let i = 0; i < array.length; i++) {
        const index = Math.floor(array[i] / exp) % 10;
        count[index]++;
    }

    // Change count[i] to contain the actual position of this digit in output[]
    for (let i = 1; i < 10; i++) {
        count[i] += count[i - 1];
    }

    // Build the output array
    for (let i = array.length - 1; i >= 0; i--) {
        const index = Math.floor(array[i] / exp) % 10;
        output[count[index] - 1] = array[i];
        count[index]--;
    }

    // Copy the sorted output to the original array
    for (let i = 0; i < array.length; i++) {
        array[i] = output[i];
    }
};

const radixSort = (array) => {
    const max = getMax(array);

    // Do counting sort for every digit
    for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
        countSort(array, exp);
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
