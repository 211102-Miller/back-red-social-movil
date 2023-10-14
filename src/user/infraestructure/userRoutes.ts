import express from 'express';
import { createUserController,
    getAllUsersController,
    getByIdCoontroller,
    updateUserByIdController,
    deleteUserController,
    updatePasswordController,
    loginUserController,
    getUserByFilterController
} from './depencies';

export const userRoutes = express.Router();


userRoutes.post("/register", createUserController.run.bind(createUserController))

userRoutes.get("/all", getAllUsersController.allUser.bind(getAllUsersController))

userRoutes.get("/:uuid", getByIdCoontroller.run.bind(getByIdCoontroller))

userRoutes.put("/update", updateUserByIdController.update.bind(updateUserByIdController))

userRoutes.delete("/:uuid", deleteUserController.deleteUser.bind(deleteUserController))

userRoutes.put("/new_password", updatePasswordController.run.bind(updatePasswordController))

userRoutes.post("/login", loginUserController.run.bind(loginUserController))

userRoutes.get("/filter", getUserByFilterController.run.bind(getUserByFilterController))