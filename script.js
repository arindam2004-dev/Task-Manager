// Form, inputs aur display area ko target kar rahe hain
const taskForm = document.getElementById('taskForm');
const taskTitleInput = document.getElementById('taskTitle');
const prioritySelect = document.getElementById('priority');
const taskList = document.getElementById('taskList');
const emptyMsg = document.getElementById('emptyMsg');

// Form submit hone par yeh function chalega
taskForm.addEventListener('submit', function(event) {
    // Page reload hone se rokne ke liye
    event.preventDefault();

    // User ki di gayi values ko fetch karna
    const taskTitle = taskTitleInput.value;
    const priority = prioritySelect.value;

    // Agar pehla task hai toh empty message ko chhupa do
    if (emptyMsg) {
        emptyMsg.style.display = 'none';
    }

    // Naya task card (div) banana
    const taskCard = document.createElement('div');
    taskCard.className = 'task-card';

    // Priority ke hisaab se border color set karna
    if (priority === 'High') {
        taskCard.style.borderLeftColor = '#dc3545'; // Red for High
        taskCard.style.background = '#f8d7da';
    } else if (priority === 'Medium') {
        taskCard.style.borderLeftColor = '#ffc107'; // Yellow for Medium
        taskCard.style.background = '#fff3cd';
    } else {
        taskCard.style.borderLeftColor = '#28a745'; // Green for Low
        taskCard.style.background = '#d4edda';
    }

    // Task card ke andar HTML content dalna (Task name + Priority + Delete button)
    taskCard.innerHTML = `
        <div>
            <strong>${taskTitle}</strong><br>
            <small>Priority: <em>${priority}</em></small>
        </div>
        <button class="delete-btn">Delete</button>
    `;

    // Delete button par click hone par task ko hataane ka logic
    const deleteBtn = taskCard.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', function() {
        taskCard.remove();
        
        // Agar saare tasks delete ho jayein, toh wapas empty message dikhana
        if (taskList.children.length <= 1) {
            emptyMsg.style.display = 'block';
        }
    });

    // Naye task card ko taskList ke andar sabse upar add karna
    taskList.prepend(taskCard);

    // Form input ko clear kar dena
    taskForm.reset();
});
