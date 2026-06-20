
const LOCAL_STORAGE_KEY = 'onlife_tasks_dataset';


let tasksDataset = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];

let currentDate = new Date(2026, 4, 1); 


let activeTaskId = null; 

document.addEventListener('DOMContentLoaded', () => {

    renderCalendar();

    const form = document.getElementById('taskForm');
    
  
    form.addEventListener('submit', (e) => {
        e.preventDefault(); 
        
        const taskName = document.getElementById('taskName').value;
        const taskTime = document.getElementById('taskTime').value;
        const taskDate = document.getElementById('taskDate').value;
        const priority = document.getElementById('taskPriority').value;
        const editingId = document.getElementById('editingTaskId').value;

        if (editingId) {

            tasksDataset = tasksDataset.map(task => {
                if (task.id === parseInt(editingId)) {
                    return { 
                        ...task, 
                        taskName, 
                        taskTime: parseInt(taskTime), 
                        taskDate, 
                        priority 
                    };
                }
                return task;
            });
            resetFormMode(); 
        } else {

            const newTask = {
                id: Date.now(), 
                taskName: taskName,
                taskTime: parseInt(taskTime),
                taskDate: taskDate, 
                priority: priority, 
                createdAt: new Date().toISOString()
            };
            tasksDataset.push(newTask);
        }

        
        saveToLocalStorage();

        renderCalendar();
        
        form.reset();
    });


    document.getElementById('closeModal').addEventListener('click', closeModal);
    

    document.getElementById('taskModal').addEventListener('click', (e) => {
        if (e.target.id === 'taskModal') closeModal();
    });

    document.getElementById('btnDeleteTask').addEventListener('click', () => {
        if (activeTaskId) {
            
            tasksDataset = tasksDataset.filter(task => task.id !== activeTaskId);
            
            saveToLocalStorage();
            renderCalendar();
            closeModal();
        }
    });


    document.getElementById('btnEditTask').addEventListener('click', () => {
        if (activeTaskId) {
            const targetTask = tasksDataset.find(task => task.id === activeTaskId);
            if (targetTask) {
                document.getElementById('editingTaskId').value = targetTask.id;
                document.getElementById('taskName').value = targetTask.taskName;
                document.getElementById('taskTime').value = targetTask.taskTime;
                document.getElementById('taskDate').value = targetTask.taskDate;
                document.getElementById('taskPriority').value = targetTask.priority;

                document.getElementById('formTitle').innerText = "Alterar tarefa";
                document.getElementById('formDescription').innerText = "Você está modificando uma tarefa já existente.";
                document.getElementById('btnSubmitForm').innerText = "Salvar Alterações";
                document.getElementById('btnCancelEdit').style.display = "inline-block";
                document.getElementById('btnResetForm').style.display = "none";
                
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
            closeModal();
        }
    });


    document.getElementById('btnCancelEdit').addEventListener('click', () => {
        form.reset();
        resetFormMode();
    });

   
    document.getElementById('prevMonth').addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar();
    });
    document.getElementById('nextMonth').addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar();
    });
});


function saveToLocalStorage() {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasksDataset));
}


function resetFormMode() {
    document.getElementById('editingTaskId').value = "";
    document.getElementById('formTitle').innerText = "Adicionar nova tarefa";
    document.getElementById('formDescription').innerText = "Preencha os detalhes abaixo para organizar sua rotina.";
    document.getElementById('btnSubmitForm').innerText = "Adicionar";
    document.getElementById('btnCancelEdit').style.display = "none";
    document.getElementById('btnResetForm').style.display = "inline-block";
}


function openModal(task) {
    activeTaskId = task.id;
    
    document.getElementById('modalTaskName').innerText = task.taskName;
    document.getElementById('modalTaskTime').innerText = task.taskTime;
    
    // Formatação de data padrão nacional (DD/MM/AAAA)
    const [ano, mes, dia] = task.taskDate.split('-');
    document.getElementById('modalTaskDate').innerText = `${dia}/${mes}/${ano}`;

    const badge = document.getElementById('modalTaskPriority');
    badge.className = `modal-priority-badge priority-${task.priority}`;
    
    const priorityLabels = { low: "Sem Prioridade", medium: "Importante", high: "Urgente" };
    badge.innerText = priorityLabels[task.priority];

    document.getElementById('taskModal').classList.add('active');
}

function closeModal() {
    document.getElementById('taskModal').classList.remove('active');
    activeTaskId = null;
}


function renderCalendar() {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
    document.getElementById('currentMonthYear').innerText = `${monthNames[month]} ${year}`;

    const calendarDays = document.getElementById('calendarDays');
    calendarDays.innerHTML = ''; 

    const firstDayIndex = new Date(year, month, 1).getDay();
    const lastDay = new Date(year, month + 1, 0).getDate();


    for (let i = 0; i < firstDayIndex; i++) {
        const emptyDiv = document.createElement('div');
        emptyDiv.classList.add('day');
        emptyDiv.style.visibility = 'hidden';
        calendarDays.appendChild(emptyDiv);
    }

    for (let day = 1; day <= lastDay; day++) {
        const dayDiv = document.createElement('div');
        dayDiv.classList.add('day');
        
        const dayNumber = document.createElement('div');
        dayNumber.classList.add('day-number');
        dayNumber.innerText = day;
        dayDiv.appendChild(dayNumber);

        const currentLoopDateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

     
        const dailyTasks = tasksDataset
            .filter(task => task.taskDate === currentLoopDateStr)
            .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

        dailyTasks.forEach(task => {
            const taskTag = document.createElement('div');
            taskTag.classList.add('task-badge', `priority-${task.priority}`);
            taskTag.innerText = `${task.taskName} (${task.taskTime}m)`;
            
            taskTag.addEventListener('click', (e) => {
                e.stopPropagation(); 
                openModal(task);
            });

            dayDiv.appendChild(taskTag);
        });

        calendarDays.appendChild(dayDiv);
    }
}