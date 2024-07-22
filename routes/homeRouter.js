import express from 'express';
import { handleHomeRoute, handleLoginRoute , handleSignupRoute } from '../controllers/homeController.js';

export const homeRouter  = express.Router();


homeRouter.route('/').get(handleHomeRoute);

homeRouter.route('/login').get(handleLoginRoute);

homeRouter.route('/signup').get(handleSignupRoute);