document.addEventListener('DOMContentLoaded', function() {
    if (window.employers) {
        const employers = window.employers;
        const addEmpBox = document.getElementById('team-members');
        const resultsDiv = document.createElement('div');
        resultsDiv.id = 'results';
        resultsDiv.style.position = 'absolute';
        resultsDiv.style.backgroundColor = '#fff';
       
        resultsDiv.style.zIndex = '1000';
        resultsDiv.style.width = '100%'; // Match the width of the input box
        resultsDiv.style.maxHeight = '200px'; // Limit the height of the results box
        resultsDiv.style.overflowY = 'auto'; // Add scroll if results exceed maxHeight

        addEmpBox.parentNode.appendChild(resultsDiv);

        addEmpBox.addEventListener('input', () => {
            if (addEmpBox.value !== '') {
                let name = addEmpBox.value.toLowerCase();
                let result = employers.filter((each) => {
                    return each.toLowerCase().startsWith(name) || each.toLowerCase() === name;
                });
        
                resultsDiv.innerHTML = ''; // Clear previous results
        
                if (result.length > 0) {
                    result.forEach(element => {
                        const item = document.createElement('p');
                        item.textContent = element;
                        item.style.padding = '5px';
                        item.style.cursor = 'pointer';
                        //before adding check it already exist or not?
                        item.addEventListener('click', () => {
                            const itm_s = document.createElement('p');
                            itm_s.textContent = `❌${element}`;
                            itm_s.className = 'selected-options';
                            itm_s.style.padding = '5px';
                            itm_s.style.margin = '5px';
                            itm_s.style.border = '1px solid #ccc';
                            document.getElementById('selected-members').appendChild(itm_s);
                            resultsDiv.innerHTML = '';
                            addEmpBox.value ='';

                        });
                        resultsDiv.appendChild(item);
                    });
                } else {
                    const message = document.createElement('div');
                    message.textContent = 'No matches found';
                    message.style.padding = '5px';
                    resultsDiv.appendChild(message);
                }
        
                console.log('appended');
            } else {
                resultsDiv.innerHTML = ''; // Clear results if input is empty
            }
        });
        

        // Hide the results when clicking outside
        document.addEventListener('click', (e) => {
            if (!addEmpBox.contains(e.target) && !resultsDiv.contains(e.target)) {
                resultsDiv.innerHTML = '';
            }
        });
    };
    document.getElementById('selected-members').addEventListener('click', (e) => {
        if (e.target.classList.contains('selected-options')) {
            e.target.remove(); 
        }
    });
});


const CreateButton = document.getElementById('Create-Project');

CreateButton.addEventListener('click' , handleProjectCreation);


async function handleProjectCreation()
{
    const projectName =  document.getElementById('project-name').value;
    const projectSpecification = document.getElementById('projectSpec').value;
    const teamMembers = [];

    Array.from(document.getElementsByClassName('selected-options')).forEach((each) => {
        teamMembers.push(each.textContent || each.value); 
    });

    const startDate = document.getElementById('start-date').value;
    const dueDate = document.getElementById('due-date').value;

    const formData = {projectName,projectSpecification ,teamMembers,startDate,dueDate};

  

}