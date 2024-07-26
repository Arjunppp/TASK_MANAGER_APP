import { Task } from "../models/taskModel.js";

export async function createTask(taskDetails) {
    try {

        const task = new Task({
            task: taskDetails.task,
            taskStatus: taskDetails.taskStatus,
            employee: taskDetails.employee,
            projectId: taskDetails.projectId
        });

        await task.save();
    } catch (error) {
        throw error;
    }
};


export async function getTasksAssociated(projectId) {
    try {
        const tasksAssociated =  await Task.find({projectId:projectId});
        return tasksAssociated;

    } catch (error) {
        throw error

    }
}