import express from 'express';
import { handleHomeRoute, handleLoginRoute , handleSignupRoute , handleLoginPost ,handleSignupPost } from '../controllers/homeController.js';

export const homeRouter  = express.Router();


homeRouter.route('/').get(handleHomeRoute);

homeRouter.route('/login').get(handleLoginRoute).post(handleLoginPost);

homeRouter.route('/signup').get(handleSignupRoute).post(handleSignupPost);