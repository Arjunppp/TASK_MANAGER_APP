import express from 'express';
import * as managerController from '../controllers/managerController.js';

export const managerRouter  = express.Router();

managerRouter.route('/searchUser').post(managerController.handleGetAllUsers);

managerRouter.route('/').get(managerController.handleGetManagerpage);

managerRouter.route('/createProject').post(managerController.handleCreateProject);

managerRouter.route('/:id').get(managerController.handleViewProject).post(managerController.handleCreateTask).put(managerController.handleUpdateProject).delete(managerController.handleDeleteProject);


managerRouter.route('/taskDel/:id').delete(managerController.handleDeleteTask).put(managerController.handleEditTask);

