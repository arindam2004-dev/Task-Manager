const taskForm = document.getElementById('taskForm');
const taskTitleInput = document.getElementById('taskTitle');
const prioritySelect = document.getElementById('priority');
const taskList = document.getElementById('taskList');
const emptyMsg = document.getElementById('emptyMsg');

// 1. Page Load hone par LocalStorage se purane tasks fetch karna
let savedTasks = JSON.parse(localStorage.getItem('myTasks')) || [];

// Initial render
renderTasks();

// Function: Tasks ko screen par dikhana
function renderTasks() {
    taskList.innerHTML = ''; // Pehle list khali karein
    
    if (savedTasks.length === 0) {
        taskList.appendChild(emptyMsg);
        emptyMsg.style.display = 'block';
        return;
    }

    emptyMsg.style.display = 'none';

    savedTasks.forEach((task, index) => {
        const taskCard = document.createElement('div');
        taskCard.className = 'task-card';

        if (task.priority === 'High') {
            taskCard.style.borderLeftColor = '#dc3545';
            taskCard.style.background = '#f8d7da';
        } else if (task.priority === 'Medium') {
            taskCard.style.borderLeftColor = '#ffc107';
            taskCard.style.background = '#fff3cd';
        } else {
            taskCard.style.borderLeftColor = '#28a745';
            taskCard.style.background = '#d4edda';
        }

        taskCard.innerHTML = `
            <div>
                <strong>${task.title}</strong><br>
                <small>Priority: <em>${task.priority}</em></small>
            </div>
            <button class="delete-btn" onclick="deleteTask(${index})">Delete</button>
        `;

        taskList.appendChild(taskCard);
    });
}

// 2. Naya Task Add karna aur LocalStorage mein Save karna
taskForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const newTask = {
        title: taskTitleInput.value,
        priority: prioritySelect.value
    };

    savedTasks.unshift(newTask); // Array mein add kiya
    localStorage.setItem('myTasks', JSON.stringify(savedTasks)); // LocalStorage mein save kiya

    renderTasks();
    taskForm.reset();
});

// 3. Task Delete karna aur LocalStorage update karna
function deleteTask(index) {
    savedTasks.splice(index, 1); // Array se hataya
    localStorage.setItem('myTasks', JSON.stringify(savedTasks)); // LocalStorage update kiya
    renderTasks();
}
