import { Project } from '../models/projectModel.js';


export async function postProjectData(projectData) {
   try {
      const { projectName, projectSpecification, updatedTeamMembers, startDate, dueDate, createdBy } = projectData;
      const teamMembers = updatedTeamMembers;
      const project = new Project({ projectName, projectSpecification, teamMembers, startDate, dueDate, createdBy });
      await project.save();
   }
   catch (error) {
      throw error;
   }
};


export async function getAllProjectByManager(username) {
   try {
      const createBy = username;
      const allProjectByThisUser = await Project.find({ createdBy: createBy });
      return allProjectByThisUser

   } catch (error) {
      throw error
   }

}

export async function getProject(projectId) {
   try {
      const projectDetails = await Project.find({ _id: projectId });
      return projectDetails;

   } catch (error) {
      throw error
   }
}