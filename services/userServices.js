
import { User } from "../models/userModel.js";
import { Project } from "../models/projectModel.js";
import { Task } from "../models/taskModel.js";


export async function postSignUp(username, email, password) {
    try {
        const user = new User({
            username, email, password
        });
        await user.save();

    } catch (error) {
        throw error;
    }


};


export async function postLogin(username) {
    try {

        let userFromDb = await User.find({ username: username });
        return userFromDb;

    } catch (error) {
        throw error;

    }
};

export async function getAllusers() {
    try {
        const allUsers = await User.find({});
        return allUsers;
    } catch (error) {
        throw error
    }

};


export async function getUserProjectsAndTasks(userName) {
    try {
        const user = userName;
        const userProjectDetails = await User.aggregate([
            {
                $match: {
                    role: 'EMPLOYEE',
                    username: user
                }
            },
            {
                $lookup: {
                    from: 'projects',
                    localField: 'username',
                    foreignField: 'teamMembers',
                    as: 'projects'
                }
            },
            {
                $unwind: '$projects'
            },
            {
                $lookup: {
                    from: 'tasks',
                    let: { projectId: '$projects._id', username: '$username' },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        { $eq: ['$projectId', '$$projectId'] },
                                        { $eq: ['$employee', '$$username'] }
                                    ]
                                }
                            }
                        }
                    ],
                    as: 'projects.tasks'
                }
            },
            {
                $match: {
                    'projects.tasks.0': { $exists: true }
                }
            },
            
            {
                $project: {
                    _id: 0,
                    email: 0,
                    password: 0,
                    'projects.teamMembers': 0
                }
            }
        ]);

        return userProjectDetails;

    } catch (error) {

        throw error;

    }
}