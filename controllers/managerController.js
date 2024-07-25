import * as projectService from "../services/projectServices.js";
import * as userService from "../services/userServices.js";


export async function handleGetManagerpage(req, res) {
   try {

      const loggedUser = req.user;
      const allUsers = await userService.getAllusers();
      const projects = await projectService.getAllProjectByManager(loggedUser.username);
      const projectsData = projects.map((each) => ({
         projectName: each.projectName,
         id: each._id,
         dueDate: each.dueDate
       }));
      const Employers = allUsers.filter(each => each.role != 'MANAGER').map(each => each.username);
      res.render('managerPage', { userInfo: loggedUser, allUsers: Employers ,projectsData:projectsData });

   } catch (error) {

      console.error(error);

   }

};


export async function handleCreateProject(req, res) {

   try {
      const createdBy = req.user.username;
      console.log(createdBy);
      const { projectName, projectSpecification, teamMembers, startDate, dueDate } = req.body;
      const updatedTeamMembers = teamMembers.map(element => {
         return element.slice(1);
      });
      const projectData = { projectName, projectSpecification, updatedTeamMembers, startDate, dueDate , createdBy};
      await projectService.postProjectData(projectData);
      res.status(200).redirect('/managerPage');
   }
   catch (error) {
      console.error(error);
   }
   //need to create schema and model for projects collection
   //along with the users the project manager name also need to be saved in the collection
   //need to save the new project data on the db
   //then redirect to manager page.
   //When the the Managerpage is rendering , we need to collect all the projects created by the project manager

};


export async function handleViewProject(req , res)
{
    const projectId = req.params.id;
    const projectDetails = await projectService.getProject(projectId);
    console.log(projectDetails);
    res.render('projectView' ,{projectDetails})
}