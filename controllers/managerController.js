import { getAllusers } from "../services/userServices.js";


export async function handleGetManagerpage(req, res) {
   try {

      const loggedUser = req.user;
      const allUsers = await getAllusers();
      const Employers =  allUsers.filter(each => each.role != 'MANAGER').map(each => each.username); 
      res.render('managerPage', { userInfo: loggedUser , allUsers:Employers});

   } catch (error) {

      console.error(error);

   }

};


export async function handleCreateProject(req , res)
{
  
  const {projectName , projectSpecification , teamMembers , startDate , dueDate} = req.body;
  console.log(projectName , projectSpecification ,teamMembers , startDate, dueDate);
  //need to create schema and model for projects collection
  //along with the users the project manager name also need to be saved in the collection
  //need to save the new project data on the db
  //then redirect to manager page.
  //When the the Managerpage is rendering , we need to collect all the projects created by the project manager
  
}