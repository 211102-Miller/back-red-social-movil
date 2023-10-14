import express from 'express';
import { createPublicController } from './dependencies';

export const publicRoutes = express.Router();


publicRoutes.post("/create", createPublicController.run.bind(createPublicController))