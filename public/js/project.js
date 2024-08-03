const searchColumn = document.getElementById('team-memberss');
const searchUrl = 'http://localhost:3000/managerPage/searchUser';

searchColumn.addEventListener('input', async (event) => {
    event.stopPropagation();
    const searchValue = event.target.value;
    const response = await fetch(searchUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ search: searchValue })
    });

    const searchResults = await response.json();

    const users = searchResults.map((each) => each.username);

    const addEmpBox = document.getElementById('team-memberss');
    const resultsDiv = document.getElementById('results') || document.createElement('div');
    resultsDiv.id = 'results';
    resultsDiv.style.position = 'absolute';
    resultsDiv.style.backgroundColor = '#fff';
    resultsDiv.style.zIndex = '1000';
    resultsDiv.style.width = '100%';
    resultsDiv.style.maxHeight = '200px';
    resultsDiv.style.overflowY = 'auto';

    if (!document.getElementById('results')) {
        addEmpBox.parentNode.appendChild(resultsDiv);
    }

    // Get existing selected members
    const teamMembers = document.getElementById('selected-members');
    const members = teamMembers.querySelectorAll('p');
    const existingMembers = Array.from(members).map((each) => each.innerText.replace('❌', '').trim());

    resultsDiv.innerHTML = '';
    if (users.length > 0) {
        users.forEach(element => {
            if (!existingMembers.includes(element)) {
                const item = document.createElement('p');
                item.textContent = element;
                item.style.padding = '5px';
                item.style.cursor = 'pointer';

                item.addEventListener('click', () => {
                    const itm_s = document.createElement('p');
                    itm_s.textContent = `❌${element}`;
                    itm_s.className = 'selected-options';
                    itm_s.style.padding = '5px';
                    itm_s.style.margin = '5px';
                    itm_s.style.border = '1px solid #ccc';
                    itm_s.style.cursor = 'pointer'; // Make it clear that these items are also clickable

                    // Add event listener to remove the item when clicked
                    itm_s.addEventListener('click', () => {
                        itm_s.remove();
                    });

                    document.getElementById('selected-members').appendChild(itm_s);
                    resultsDiv.innerHTML = '';
                    addEmpBox.value = '';
                });
                resultsDiv.appendChild(item);
            }
        });
    } else {
        const message = document.createElement('div');
        message.textContent = 'No matches found';
        message.style.padding = '5px';
        resultsDiv.appendChild(message);
    }

    console.log(users);
});



const createTask = document.getElementById('create-task');

function taskModalInsertion() {
    const teamMembersString = document.getElementById('team-members');
    const membersArray = [];
    teamMembersString.querySelectorAll('p').forEach((each) => {
        membersArray.push(each.textContent.trim());
    });


    const form = document.createElement('form');
    form.setAttribute('id', 'taskForm');
    form.classList.add('form-group');


    const taskInput = document.createElement('input');
    taskInput.setAttribute('type', 'text');
    taskInput.setAttribute('name', 'taskName');
    taskInput.setAttribute('id', 'task-input');
    taskInput.setAttribute('placeholder', 'Task Name');
    taskInput.classList.add('form-control', 'mb-3');
    form.appendChild(taskInput);

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
}

createTask.addEventListener('click', () => {
    taskModalInsertion();
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
            if (response.ok && response.statusText == 'OK') {
                window.location.href = `http://localhost:3000/managerPage/${projectId}`;
            }

        } catch (error) {
            console.error('Error:', error);
        }



    });

});





const taskSections = document.querySelectorAll('.tasks-section');

taskSections.forEach(taskSection => {
    taskSection.addEventListener('click', async (event) => {


        const deleteTaskElement = event.target.closest('.Delete-task');
        if (!deleteTaskElement) {
            const taskSubSectionElement = event.target.closest('.task-sub-section');
            if (taskSubSectionElement) {
                const taskId = taskSubSectionElement.getAttribute('task-id');
                const taskModal = new bootstrap.Modal(document.getElementById('exampleModal'));
                taskModal.show();
                taskModalInsertion();
                const taskNameElement = taskSubSectionElement.querySelector('#task-name');
                document.getElementById('task-input').value = taskNameElement.innerText;
                document.getElementById('save-task').addEventListener('click', async () => {

                    const editUrl = `http://localhost:3000/managerPage/taskDel/${taskId}`;
                    const task = document.getElementById('task-input').value;
                    const taskStatus = document.getElementById('task-status').value;
                    const employee = document.getElementById('employee-option').value;
                    const taskData = { task, taskStatus, employee };
                    const projectId = document.getElementById('project-details').getAttribute('project-id');
                    try {
                        const response = await fetch(editUrl, {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(taskData)
                        });

                        if (!response.ok) {
                            throw new Error(`HTTP error! status: ${response.status}`);
                        }
                        if (response.ok) {
                            window.location.reload();
                        }

                    } catch (error) {
                        console.error('Error:', error);
                    }


                });
            }
        }
        if (deleteTaskElement) {

            const taskId = deleteTaskElement.getAttribute('task-id');
            if (confirm('Do you want to delete the task')) {
                const deleteTaskUrl = `http://localhost:3000/managerPage/taskDel/${taskId}`;
                const response = await fetch(deleteTaskUrl, { method: 'DELETE' });
                if (response.ok) {
                    window.location.reload();
                }
            }
        }
    });
});


const editProject = document.getElementById('Edit-project');

editProject.addEventListener('click', () => {
    const projectName = document.getElementById('Project-name').innerText.split(':')[1].trim();
    const projectSpecification = document.getElementById('Project-specification').innerText.split(':')[1].trim();
    const startDate = document.getElementById('start-date').innerText.split(':')[1].split('-').reverse().map(part => part.trim()).join('-');
    const dueDate = document.getElementById('end-date').innerText.split(':')[1].split('-').reverse().map(part => part.trim()).join('-');

    document.getElementById('selected-members').innerHTML = '';

    // Optionally repopulate selected members if needed
    const teamMembers = document.getElementById('team-members');
    const members = teamMembers.querySelectorAll('p');
    Array.from(members).forEach(each => {
        const element = each.innerText.replace('❌', '').trim();
        const itm_s = document.createElement('p');
        itm_s.textContent = `❌${element}`;
        itm_s.className = 'selected-options';
        itm_s.style.padding = '5px';
        itm_s.style.margin = '5px';
        itm_s.style.border = '1px solid #ccc';
        document.getElementById('selected-members').appendChild(itm_s);
    });

    document.getElementById('selected-members').addEventListener('click', (event) => {
        if (event.target.classList.contains('selected-options')) {
            event.target.remove();
        }
    });

    document.getElementById('project-name').value = projectName;
    document.getElementById('projectSpec').value = projectSpecification;
    document.getElementById('startt-date').value = startDate;
    document.getElementById('due-date').value = dueDate;
});




const updateProject = document.getElementById('Update-Project');


updateProject.addEventListener('click', async (event) => {
    event.stopPropagation();
    const projectId = document.getElementById('project-details').getAttribute('project-id');
    const projectName = document.getElementById('project-name').value;
    const projectSpecification = document.getElementById('projectSpec').value;
    const startDate = document.getElementById('startt-date').value;
    const dueDate = document.getElementById('due-date').value;
    const selectedMemebers = document.getElementById('selected-members').querySelectorAll('p');
    const members = [];
    Array.from(selectedMemebers).forEach((Each) => {
        members.push(Each.innerText.substring(1));
    });





    const updatedDetails = { projectName, projectSpecification, startDate, dueDate, projectId, members };

    const updateUrl = `http://localhost:3000/managerPage/${projectId}`;

    const response = await fetch(updateUrl, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedDetails)
    });

    if (response.ok && response.statusText == 'OK') {
        alert('Project Updated Successfully');
        window.location.href = `http://localhost:3000/managerPage/${projectId}`;
    }
});



const closeProject = document.getElementById('close-project');

closeProject.addEventListener('click', async() => {
    if (confirm('Do you want to delete the project ')) {
        const projectId = document.getElementById('project-details').getAttribute('project-id');
        const closeProjectUrl = `http://localhost:3000/managerPage/${projectId}`;
        const resposne = await fetch(closeProjectUrl, { method: 'DELETE' });
        if (resposne.ok) {
            alert('Project Deleted Successfully');
            window.location.href = `http://localhost:3000/managerPage`;
        }
        

    }


})
