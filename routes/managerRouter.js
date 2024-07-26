import express from 'express';
import * as managerController from '../controllers/managerController.js';

export const managerRouter  = express.Router();

managerRouter.route('/').get(managerController.handleGetManagerpage);

managerRouter.route('/createProject').post(managerController.handleCreateProject);

managerRouter.route('/:id').get(managerController.handleViewProject).post(managerController.handleCreateTask);
