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

}