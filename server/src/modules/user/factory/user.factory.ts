import db from "../../../../database/database"
import { UserController } from "../controllers/user.controller"
import { UserRepository } from "../repository/user.repository"
import { UserService } from "../services/user.service"


function userFactory(){
    const userRopsitory = new UserRepository(db.getSequelize(), )
    const userService = new UserService(userRopsitory)
    const userController = new UserController(userService)

    return {userController, userService, userRopsitory}
}

export const { userController, userService, userRopsitory } = userFactory()