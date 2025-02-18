import Block from "../models/block.model"
import { InferAttributes, Sequelize, WhereOptions } from "sequelize"


type Where = WhereOptions<InferAttributes<Block, {omit:never}>> 

export class BlockRepository {
  constructor(private readonly sequelize: Sequelize) {}

  async getBlockById(id: number): Promise<Block | null> {
    return await Block.findOne({ where: { id } })
  }

  async getBlockWhere(where: Where ): Promise<Block | null> {    
    return await Block.findOne({where})
  }

  async addBlock(block: Partial<Block>): Promise<Block> {
    return await Block.create(block as Block)
  }

  async getBlocks(): Promise<Block[]> {
    return await Block.findAll()
  }

  async countBlocks(): Promise<number> {
    return await Block.count()
  }
  
}