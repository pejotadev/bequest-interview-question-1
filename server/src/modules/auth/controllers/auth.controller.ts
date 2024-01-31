import { NextFunction, Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import { RegisterDTO } from "../dtos/register.dto";
import { STATUS_CODE } from "../../../utils/status.codes";
import { LoginDTO } from "../dtos/login.dto";


export class AuthController {

  constructor(private authService: AuthService) {
  }

  register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { body }: { body: any } = req;
      const registerDTO = RegisterDTO.validate(body);
      const response = await this.authService.register(registerDTO);
      res.status(STATUS_CODE.CREATED).send(response)
    } catch (error) {
      next(error);
    }
  };

  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { body }: { body: any } = req;
      const loginDTO = LoginDTO.validate(body);
      const response = await this.authService.login(loginDTO);
      res.status(STATUS_CODE.OK).send(response)
    } catch (error) {
      next(error);
    }
  };

}