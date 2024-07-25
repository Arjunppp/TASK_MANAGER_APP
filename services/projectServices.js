import {Project} from '../models/projectModel.js';


export async function postProjectData(projectData)
{
   try
   {
    const { projectName, projectSpecification, updatedTeamMembers, startDate, dueDate, createdBy } = projectData;
    const teamMembers =  updatedTeamMembers;
    const project = new Project({projectName, projectSpecification, teamMembers, startDate, dueDate , createdBy });
    await project.save();
   }
   catch(error)
   {
    throw error;
   }
}