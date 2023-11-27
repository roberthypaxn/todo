
const button = document.querySelector("button");
const inputField = document.querySelector("#task");
const list = document.querySelector("#list");
const noInput = document.querySelector("#noInput");
const output = document.querySelector(".output");

button.addEventListener("click", function () {
  const inputValue = inputField.value;
  if (!inputValue) {
    noInput.textContent = "Please enter a valid task.";
    noInput.style.display = "block"; // Make sure it's visible
    setTimeout(function() {
      // Hide the content again after 3000 milliseconds (3 seconds)
      noInput.style.display = "none";
    }, 3000);
    return;
  }

  noInput.textContent = "";//just to make sure
  const listItem = document.createElement("li");

  // Create checkbox
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.id = "checkbox_" + Date.now(); // Create a unique ID for each checkbox (for the label element)
  checkbox.addEventListener("change", function () {
    // Handle checkbox change
    label.classList.toggle('checked', checkbox.checked);

  });

  // Create label
  const label = document.createElement("label");
  label.textContent = inputValue;
  label.setAttribute("for", checkbox.id);

  // Append checkbox and label to the list item
  listItem.appendChild(checkbox);
  listItem.appendChild(label);


  // Mark as Important button
  const importantButton = document.createElement("button");
  importantButton.textContent = "★";
  importantButton.title = "Mark as important";
  importantButton.addEventListener("click", function() {
    listItem.classList.toggle('important');
  });
  listItem.appendChild(importantButton);


  // delete button
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.classList.add("delete");
  deleteButton.title = "Delete Item";
  deleteButton.addEventListener("click", function() {
    list.removeChild(listItem);
    if (list.childNodes.length === 0) {
      output.style.border = "none";
    }
  });

  listItem.appendChild(deleteButton);

  // Insert the new list item at the beginning of the list
  list.insertBefore(listItem, list.firstChild);

  inputField.value ='';

  // output.style.border = "1.5px dashed white";
  importantButton.style.color = "gold";
  importantButton.style.border = "3px solid white"
});