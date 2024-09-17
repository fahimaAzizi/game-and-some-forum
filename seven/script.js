// Function to add a new task to the list
function addTask() {
    const taskInput = document.getElementById('todo-input');
    const taskText = taskInput.value.trim();
    
    if (taskText !== '') {
        const taskList = document.getElementById('todo-list');

        // Create a new list item (li) for the task
        const listItem = document.createElement('li');

        // Create the task text
        listItem.innerHTML = `${taskText} <button class="remove-btn" onclick="removeTask(this)">Remove</button>`;

        // Mark task as complete on click
        listItem.onclick = function() {
            listItem.classList.toggle('completed');
        };

        // Add the list item to the task list
        taskList.appendChild(listItem);

        // Clear the input field
        taskInput.value = '';
    } else {
        alert('Please enter a task');
    }
}

// Function to remove a task from the list
function removeTask(button) {
    const listItem = button.parentNode;
    listItem.remove();
}
