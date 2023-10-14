import express from 'express';
import { createUserController } from './depencies';

export const userRoutes = express.Router();


userRoutes.post("/register", createUserController.run.bind(createUserController))