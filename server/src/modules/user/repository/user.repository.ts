import { InferAttributes, Sequelize, WhereOptions } from "sequelize"
import User from "../models/user.model"

type Where = WhereOptions<InferAttributes<User, {omit:never}>> 

export class UserRepository {
  constructor(private readonly sequelize: Sequelize) {}
  async getUserById(id: number): Promise<User | null> {
    return await  User.findOne<User>({ where: { id } })
  }
  async getUserBy(where: Where ): Promise<User | null> {    
    return await  User.findOne({where})
  }
  async createUser(data: any): Promise<User> {
    return await  User.create(data)
  }
  async updateUser(data: any, where: Where): Promise<User | null>{
    const updated = await User.update(data, { where })
    if (updated) {
      return await User.findOne<User>({ where })
    }
    throw new Error("User not found")
  }
  
}


