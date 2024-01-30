import User from "../../user/models/user.model";
import { LoginDTO } from "../dtos/login.dto";
import { RegisterDTO } from "../dtos/register.dto";

export interface IAuthService {
  register(data: RegisterDTO): Promise<User>;
}