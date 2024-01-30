import { NextFunction, Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import { RegisterDTO } from "../dtos/register.dto";
import { STATUS_CODE } from "../../../utils/status.codes";


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

}