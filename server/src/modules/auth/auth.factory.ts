
import { userService } from "../user/factory/user.factory";
import { AuthController } from "./controllers/auth.controller";
import { AuthService } from './services/auth.service';


function authFactory(){

    const authService = new AuthService(userService);
    const authController = new AuthController(authService);

    return {authService, authController}
}

export const {authService, authController} = authFactory()