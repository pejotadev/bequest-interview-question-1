import { NextFunction, Request, Response } from "express"
import { userService } from "../../user/factory/user.factory"
import { UserDataContext } from "../../user/context/userContext"
import { STATUS_CODE } from "../../../utils/status.codes"
import { ERROR_MESSAGES } from "../../../utils/error/messages.enum.errors"

export const AuthMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { headers } = req
  let { apikey } = headers
  
  if (!apikey) {
    return res.status(STATUS_CODE.UNAUTHORIZED).send({
      status: STATUS_CODE.UNAUTHORIZED,
      errorMessage: ERROR_MESSAGES.INVALID_APIKEY,
      errors: null,
    })
  }

  const user = await userService.getUserByApiToken(apikey as string)

  if (!user) {
    return res.status(STATUS_CODE.NOT_FOUND).send({
      status: STATUS_CODE.NOT_FOUND,
      errorMessage: ERROR_MESSAGES.USER_NOT_FOUND,
      errors: null,
    })
  }

  if (user) {
    UserDataContext.getInstance().setUser({
      companyId: user.companyId as number,
      userId: user.userId,
      officeId: user.officeId as number,
      brokerId: user.brokerId as number,
    })
  }

  next()
}
