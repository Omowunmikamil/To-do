const taskInput = document.getElementById("taskInput"); // Input field for new tasks
const taskList = document.getElementById("taskList"); // List container for tasks
const taskForm = document.getElementById("taskForm"); // Form element for task input

// Function to handle task submission
function inputTask(event) {
  event.preventDefault(); // Prevent form submission from reloading the page
  const task = taskInput.value; // Get the value from the input field
  if (task) {
    addTaskToList(task, false); // Add the task to the list (not checked by default)
    taskInput.value = ""; // Clear the input field
    saveTaskHistory(); // Save the updated task list to localStorage
  }
}

// Function to add a task to the list
function addTaskToList(task, isChecked) {
  const li = document.createElement("li"); // Create a new list item

  // Create the checkbox button
  const checkbox = document.createElement("button");
  checkbox.classList.add("checkbox");
  checkbox.setAttribute("aria-label", "complete");
  checkbox.innerHTML = isChecked
    ? `<i class="fa fa-check"></i>` // Checked icon
    : `<i class="fa fa-square"></i>`; // Unchecked icon

  const span = document.createElement("span"); // Create a span for the task text
  span.textContent = task; // Set the task text

  // Create the delete button
  const deleteButton = document.createElement("button");
  deleteButton.classList.add("delete");
  deleteButton.setAttribute("aria-label", "delete");
  deleteButton.innerHTML = `<i class="fas fa-trash"></i>`; // Delete icon

  if (isChecked) {
    li.classList.add("checked"); // Add the checked class if the task is checked
  }

  li.appendChild(checkbox); // Add the checkbox to the list item
  li.appendChild(span); // Add the task text to the list item
  li.appendChild(deleteButton); // Add the delete button to the list item

  taskList.appendChild(li); // Add the list item to the task list

  // Add event listeners for the checkbox and delete button
  checkbox.addEventListener("click", checkTask);
  deleteButton.addEventListener("click", deleteTask);
}

// Function to toggle the checked state of a task
function checkTask(event) {
  const li = event.target.closest("li"); // Get the closest list item
  const button = event.target.closest("button"); // Get the closest button
  const isChecked = li.classList.toggle("checked"); // Toggle the checked class

  if (isChecked) {
    button.innerHTML = `<i class="fa fa-check"></i>`; // Change to checked icon
  } else {
    button.innerHTML = `<i class="fa fa-square"></i>`; // Change to unchecked icon
  }

  saveTaskHistory(); // Save the updated task list to localStorage
}

// Function to delete a task from the list
function deleteTask(event) {
  const li = event.target.closest("li"); // Get the closest list item
  taskList.removeChild(li); // Remove the list item from the task list
  saveTaskHistory(); // Save the updated task list to localStorage
}

// Function to save the task list to localStorage
function saveTaskHistory() {
  const tasks = [];

  // Loop through each list item and save its task text and checked state
  taskList.querySelectorAll("li").forEach((li) => {
    const task = li.querySelector("span").textContent;
    const isChecked = li.classList.contains("checked");
    tasks.push({ task, isChecked }); // Add the task and its state to the tasks array
  });

  localStorage.setItem("tasks", JSON.stringify(tasks)); // Save the tasks array to localStorage
}

// Function to load the task list from localStorage
function loadTaskHistory() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || []; // Get the tasks from localStorage or an empty array
  tasks.forEach(({ task, isChecked }) => addTaskToList(task, isChecked)); // Add each task to the list
}

// Event listeners for form submission and page load
taskForm.addEventListener("submit", inputTask);
document.addEventListener("DOMContentLoaded", loadTaskHistory);
