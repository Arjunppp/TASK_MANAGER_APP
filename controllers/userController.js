import * as userService from "../services/userServices.js";


export async function handleGetUserPage(req, res) {
    try {
        const logedUser = req.user;
        //for the user --- find the projects in which he is memeber and the task which is associated
        //Aggreagate users -projects - tasks
        const userName = logedUser.username;
        const userProjectsAndTasks = await userService.getUserProjectsAndTasks(userName);
        console.log(userProjectsAndTasks);
        res.render('userPage' ,{userProjectTasks:userProjectsAndTasks , logedUser:logedUser} );

    } catch (error) {

        console.error(error);

    }
}