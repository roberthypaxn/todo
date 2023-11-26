
const button = document.querySelector("button");
const inputField = document.querySelector("#task");
const list = document.querySelector("#list");
const noInput = document.querySelector("#noInput");
const output = document.querySelector(".output");

button.addEventListener("click", function () {
  const inputValue = inputField.value;
  if (!inputValue) {
    noInput.textContent = "Please enter a valid task.";
    return;
  }

  noInput.textContent = "";
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
  importantButton.addEventListener("click", function() {
    listItem.classList.toggle('important');
  });
  listItem.appendChild(importantButton);


  // delete button
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.addEventListener("click", function() {
    list.removeChild(listItem);
    if (list.childNodes.length === 0) {
      output.style.border = "none";
    }
  });

  listItem.appendChild(deleteButton);

  // Insert the new list item at the beginning of the list
  list.insertBefore(listItem, list.firstChild);

  //inputField.value ='';

  output.style.border = "1.5px dashed white";
  output.style.width = "70%";
  output.style.margin = "1em auto";
  output.style.padding = "0.5rem";
  
});