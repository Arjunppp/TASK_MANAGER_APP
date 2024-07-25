

const createTask = document.getElementById('create-task');

createTask.addEventListener('click', () => {

    const teamMembersString = document.getElementById('team-members');
    const membersArray = [];
    teamMembersString.querySelectorAll('p').forEach((each) => {
        membersArray.push(each.textContent.trim());
    });
    console.log(membersArray);

    //create an form element
    const form = document.createElement('form');
    form.setAttribute('id', 'taskForm');
    form.classList.add('form-group');

    //Inside the form element add an input box for task name
    const taskInput = document.createElement('input');
    taskInput.setAttribute('type', 'text');
    taskInput.setAttribute('name', 'taskName');
    taskInput.setAttribute('placeholder', 'Task Name');
    taskInput.classList.add('form-control', 'mb-3');
    form.appendChild(taskInput)
    //create an drop down coloumn -- for task status -- To do , ongion , completed
    const taskStatusSelect = document.createElement('select');
    taskStatusSelect.setAttribute('name', 'taskStatus');
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
})