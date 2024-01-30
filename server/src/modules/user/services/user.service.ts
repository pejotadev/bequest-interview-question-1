import { RequestGetUserDTO } from "../dtos/user.users.request.dto"
import { UserRepository } from "../repository/user.repository"

import { IUserService } from "./user.service.interface"

export class UserService implements IUserService {
  constructor(private readonly userRepository: UserRepository) {}
  async getUserById({ id }: RequestGetUserDTO) {
    return this.userRepository.getUserBy({id})
  }
  async createUser(data: any) {
    return this.userRepository.createUser(data)
  }
  async updateUser(data: any, where: any) {
    return this.userRepository.updateUser(data, where)
  }
  async getUserBy(where: any) {
    return this.userRepository.getUserBy(where)
  }

}
