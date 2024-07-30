
const taskContainers = document.getElementsByClassName('tasks-container');
const taskContainersArray = Array.from(taskContainers);

taskContainersArray.forEach((element) => {

    element.addEventListener('click', (event) => {
        const taskBox = event.target.closest('.task-box');

        if (taskBox) {

            const elements = taskBox.querySelectorAll('p');
            const elementArray = Array.from(elements);
            const task = elementArray[1].innerText.split(':')[1];
            const taskName = elementArray[0].innerText.split(':')[1];


            const taskId = taskBox.getAttribute('task-id');
            console.log('Task ID:', taskId, 'Task status:', task, 'Task name :', taskName);

            const modalElement = document.getElementById('taskChange');
            const modal = new bootstrap.Modal(modalElement);
            modal.show();
            document.getElementById('change-status').setAttribute('task-id', taskId);
            document.getElementById('project-name').value = taskName;
            document.getElementById('project-status').value = task;
        }
    })

});


const changeStatusBtn = document.getElementById('change-status');

changeStatusBtn.addEventListener('click', changeStatus);

async function changeStatus() {
    const taskId = document.getElementById('change-status').getAttribute('task-id');
    const taskStatus = document.getElementById('project-status').value;
    const taskCHangeUrl = `http://localhost:3000/userpage/${taskId}`;
    console.log(taskStatus);
    const response = await fetch(taskCHangeUrl, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({taskStatus})
    });
    if(response.ok && response.statusText == 'OK')
    {
        window.location.href = 'http://localhost:3000/userpage';
    }

}