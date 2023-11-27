// Selecting elements from the DOM
const button = document.querySelector("button");
const inputField = document.querySelector("#task");
const list = document.querySelector("#list");
const noInput = document.querySelector("#noInput");
const output = document.querySelector(".output");

// Load tasks from localStorage when the page loads
document.addEventListener("DOMContentLoaded", function () {
  // Retrieve tasks from localStorage
  const savedTasks = localStorage.getItem("tasks");

  // If there are saved tasks, populate the list with them
  if (savedTasks) {
    list.innerHTML = savedTasks;
    // Attach event listeners to the delete and ★ buttons
    attachButtonListeners();
  }
});

// Event listener for the button click
button.addEventListener("click", function () {
  // Get the value from the input field
  const inputValue = inputField.value;
  
  // Check if the input is empty
  if (!inputValue) {
    // Display an error message
    noInput.textContent = "Please enter a valid task.";
    noInput.style.display = "block";
    
    // Hide the error message after 3 seconds
    setTimeout(function () {
      noInput.style.display = "none";
    }, 3000);
    
    return;
  }

  // Clear the error message
  noInput.textContent = "";

  // Create a new list item
  const listItem = document.createElement("li");
  
  // Create a checkbox
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.id = "checkbox_" + Date.now();
  
  // Event listener for checkbox change
  checkbox.addEventListener("change", function () {
    label.classList.toggle("checked", checkbox.checked);
  });

  // Create a label for the task
  const label = document.createElement("label");
  label.textContent = inputValue;
  label.setAttribute("for", checkbox.id);

  // Append the checkbox and label to the list item
  listItem.appendChild(checkbox);
  listItem.appendChild(label);

  // Create a button to mark the task as important
  const importantButton = document.createElement("button");
  importantButton.textContent = "★";
  importantButton.title = "Mark as important";

  // Event listener for the important button click
  importantButton.addEventListener("click", function () {
    listItem.classList.toggle("important");
    saveTasks(); // Save tasks after marking as important
  });

  // Append the important button to the list item
  listItem.appendChild(importantButton);

  // Create a delete button
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.classList.add("delete");
  deleteButton.title = "Delete Item";

  // Event listener for the delete button click
  deleteButton.addEventListener("click", function () {
    list.removeChild(listItem);
    saveTasks(); // Save tasks after deletion
    
    // If the list is empty, remove the border
    if (list.childNodes.length === 0) {
      output.style.border = "none";
    }
  });

  // Append the delete button to the list item
  listItem.appendChild(deleteButton);

  // Insert the new list item at the beginning of the list
  list.insertBefore(listItem, list.firstChild);

  // Clear the input field
  inputField.value = "";

  // Style the important button
  importantButton.style.color = "gold";
  importantButton.style.border = "3px solid white";

  saveTasks(); // Save tasks after adding a new one
  attachButtonListeners(); // Attach event listeners after adding a new task
});

// Function to save tasks to localStorage
function saveTasks() {
  localStorage.setItem("tasks", list.innerHTML);
}
// Function to attach event listeners to delete and important buttons
function attachButtonListeners() {
    const deleteButtons = document.querySelectorAll(".delete");
    const importantButtons = document.querySelectorAll("[title='Mark as important']");
  
    deleteButtons.forEach(function (button) {
      button.addEventListener("click", function () {
        const listItem = button.parentNode;
        list.removeChild(listItem);
        saveTasks();
  
        if (list.childNodes.length === 0) {
          output.style.border = "none";
        }
      });
    });
  
    importantButtons.forEach(function (button) {
      button.addEventListener("click", function () {
        const listItem = button.parentNode;
        listItem.classList.toggle("important");
        saveTasks();
      });
    });
    checkboxes.forEach(function (checkbox) {
        checkbox.addEventListener("change", function () {
          const listItem = checkbox.parentNode;
          label = listItem.querySelector("label"); // Get the associated label
          label.classList.toggle("checked", checkbox.checked);
          saveTasks();
        });
      });
  }