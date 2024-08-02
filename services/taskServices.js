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
        const tasksAssociated = await Task.find({ projectId: projectId });
        return tasksAssociated;

    } catch (error) {
        throw error

    }
};


export async function DeleteTask(taskId) {
    try {
        const task = await Task.findOneAndDelete({ _id: taskId })

    } catch (error) {
        throw error
    }
};

export async function updateTask(taskDetails) {
    try {
        const { task, taskStatus, employee, taskId } = taskDetails;
        const updatedResult = await Task.findByIdAndUpdate({ _id: taskId }, { task: task, taskStatus: taskStatus, employee: employee }, { new: true });
        return updatedResult;

    } catch (error) {
        throw error
    }
};


export async function updateTaskSTatusByUser(taskId, taskStatus) {
    try {

        const updatedTask = await Task.findByIdAndUpdate({ _id: taskId }, { taskStatus: taskStatus });
        return updatedTask;

    } catch (error) {

        throw error

    }

}