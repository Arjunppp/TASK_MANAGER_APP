import express from 'express';
import * as homeController from '../controllers/homeController.js';

export const homeRouter  = express.Router();


homeRouter.route('/').get(homeController.handleGetHome);

homeRouter.route('/login').get(homeController.handleGetLogin).post(homeController.handlePostLogin);

homeRouter.route('/signup').get(homeController.handleGetSignup).post(homeController.handlePostSignUp);