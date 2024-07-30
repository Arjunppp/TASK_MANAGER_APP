import * as userService from "../services/userServices.js";
import * as taskService from "../services/taskServices.js";


export async function handleGetUserPage(req, res) {
    try {
        const logedUser = req.user;
        //for the user --- find the projects in which he is memeber and the task which is associated
        //Aggreagate users -projects - tasks
        const userName = logedUser.username;
        const userProjectsAndTasks = await userService.getUserProjectsAndTasks(userName);
        res.render('userPage', { userProjectTasks: userProjectsAndTasks, logedUser: logedUser });

    } catch (error) {

        console.error(error);

    }
};

export async function handleUpdateTask(req, res) {
    try {
        const taskId = req.params.id;
        const { taskStatus } = req.body;
        const result = await taskService.updateTaskSTatusByUser(taskId, taskStatus);
        res.send('ok');

    } catch (error) {

        console.error(error);

    }
}