import { NextFunction, Request, Response } from "express"
import { STATUS_CODE } from "../../../utils/status.codes"
import { IUserController } from "./user.controller.interface"
import { IUserService } from "../services/user.service.interface"
import { RequestGetUserDTO } from "../dtos/user.users.request.dto"


export class UserController implements IUserController {
  constructor(private readonly userService: IUserService) {}


  getUser = async (req: Request, res: Response, next: NextFunction) => {
    const { params }: { params: any } = req
    try {
      const requestGetUserDTO = RequestGetUserDTO.validate(params)

      const response = await this.userService.getUserById(requestGetUserDTO)

      res.status(STATUS_CODE.OK).send(response)
    } catch (error) {
      next(error)
    }
  }
}
