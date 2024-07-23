import express from 'express';
import * as managerController from '../controllers/managerController.js';

export const managerRouter  = express.Router();

managerRouter.route('/').get(managerController.handleGetManagerpage)