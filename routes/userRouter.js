import express from 'express';
import * as userController from '../controllers/userController.js';


export const userRouter  = express.Router();


userRouter.route('/').get(userController.handleGetUserPage);