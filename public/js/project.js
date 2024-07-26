


const createTask = document.getElementById('create-task');

createTask.addEventListener('click', () => {

    const teamMembersString = document.getElementById('team-members');
    const membersArray = [];
    teamMembersString.querySelectorAll('p').forEach((each) => {
        membersArray.push(each.textContent.trim());
    });

    //create an form element
    const form = document.createElement('form');
    form.setAttribute('id', 'taskForm');
    form.classList.add('form-group');

    //Inside the form element add an input box for task name
    const taskInput = document.createElement('input');
    taskInput.setAttribute('type', 'text');
    taskInput.setAttribute('name', 'taskName');
    taskInput.setAttribute('id', 'task-input');
    taskInput.setAttribute('placeholder', 'Task Name');
    taskInput.classList.add('form-control', 'mb-3');
    form.appendChild(taskInput);
    //create an drop down coloumn -- for task status -- To do , ongion , completed
    const taskStatusSelect = document.createElement('select');
    taskStatusSelect.setAttribute('name', 'taskStatus');
    taskStatusSelect.setAttribute('id', 'task-status');

    taskStatusSelect.classList.add('form-control', 'mb-3');
    const status = ['todo', 'on Going', 'completed'];
    status.forEach((each) => {
        const option = document.createElement('option')
        option.value = each.toLocaleLowerCase();
        option.innerText = each.toLocaleLowerCase();
        taskStatusSelect.appendChild(option);

    });
    form.appendChild(taskStatusSelect)

    //create an drop down for users --membersArray
    const employeeSelect = document.createElement('select');
    employeeSelect.setAttribute('name', 'teamMember');
    employeeSelect.classList.add('form-control', 'mb-3');
    employeeSelect.setAttribute('id', 'employee-option');
    membersArray.forEach((each) => {
        const option = document.createElement('option')
        option.value = each.toLocaleLowerCase();
        option.innerText = each.toLocaleLowerCase();
        employeeSelect.appendChild(option);
    });
    form.appendChild(employeeSelect);


    const modal = document.getElementById('modal-body');
    modal.innerHTML = '';
    modal.appendChild(form);
});


const saveTask = document.getElementById('save-task');

saveTask.addEventListener('click', async () => {

    const task = document.getElementById('task-input').value;
    const taskStatus = document.getElementById('task-status').value;
    const employee = document.getElementById('employee-option').value;
    const projectId = document.getElementById('project-details').getAttribute('project-id');
    const taskCreationUrl = `http://localhost:3000/managerPage/${projectId}`;
    const taskData = { task, taskStatus, employee };

    try {
        const response = await fetch(taskCreationUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(taskData)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        if(response.ok && response.statusText == 'OK')
        {
            window.location.href = `http://localhost:3000/managerPage/${projectId}`;
        }

    } catch (error) {
        console.error('Error:', error);
    }



})

//Now when onclick save ---- Post request to create task
//POST --- with deatsils
//Create schema and model for post
//in the post schema we need to add the project-id coloumn
//and now the task need to be saved
//now when the project pag is rendering --- Aliong with post details associated task details also need to be renderedf