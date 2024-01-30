import User from "../models/user.model"
import { RequestGetUserDTO } from "../dtos/user.users.request.dto"
export interface IUserService {
    getUserById(requestGetUserDTO:RequestGetUserDTO): Promise<User | null>
}