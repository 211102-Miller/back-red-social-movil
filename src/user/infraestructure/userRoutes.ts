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
import { validateToken } from '../../helpers/verifiqueToken';

export const userRoutes = express.Router();

userRoutes.post("/login", loginUserController.run.bind(loginUserController))

userRoutes.post("/register", createUserController.run.bind(createUserController))


// Middleware para verificar el token en las rutas siguientes
userRoutes.use(validateToken);

userRoutes.get("/all", getAllUsersController.allUser.bind(getAllUsersController))

userRoutes.get("/:uuid", getByIdCoontroller.run.bind(getByIdCoontroller))

userRoutes.put("/update", updateUserByIdController.update.bind(updateUserByIdController))

userRoutes.delete("/:uuid", deleteUserController.deleteUser.bind(deleteUserController))

userRoutes.put("/new_password", updatePasswordController.run.bind(updatePasswordController))

userRoutes.get("/filter", getUserByFilterController.run.bind(getUserByFilterController))