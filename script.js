const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const taskCounter = document.getElementById('taskCounter');

// Cargar tareas guardadas
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Guardar tareas
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Contador de tareas pendientes
function updateCounter() {
    const pending = tasks.filter(t => !t.completed).length;
    taskCounter.textContent = `Pending tasks: ${pending}`;
}

// Renderizar tareas
function renderTasks() {
    taskList.innerHTML = '';

    // Orden: tareas pendientes arriba, completadas abajo
    const sortedTasks = [...tasks].sort((a,b) => a.completed - b.completed);

    sortedTasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.textContent = task.text;
        if(task.completed) li.classList.add('completed');

        // Marcar completada
        li.addEventListener('click', () => {
            task.completed = !task.completed;
            saveTasks();
            renderTasks();
        });

        // Botón borrar
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'X';
        deleteBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            tasks.splice(index, 1);
            saveTasks();
            renderTasks();
        });

        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    });

    updateCounter();
}

// Agregar tarea
function addTask() {
    const taskText = taskInput.value.trim();
    if(taskText === '') return;

    tasks.push({ text: taskText, completed: false });
    saveTasks();
    renderTasks();
    taskInput.value = '';
}

addTaskBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', (e) => {
    if(e.key === 'Enter') addTask();
});

// Inicializar
renderTasks();
