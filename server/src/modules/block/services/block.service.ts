import Block from "../models/block.model";
import { BlockRepository } from "../repositories/block.repository";
import { IBlockService } from "./block.service.interface";
import { InferAttributes, WhereOptions } from "sequelize"

export class BlockService implements IBlockService {
  constructor(private readonly blockRepository: BlockRepository) {}

  async getBlockById(id: number): Promise<Block | null> {
    return await this.blockRepository.getBlockById(id);
  }

  async getBlockWhere(where: WhereOptions<InferAttributes<Block, { omit: never }>>): Promise<Block | null> {
    return await this.blockRepository.getBlockWhere(where);
  }

  async addBlock(block: Partial<Block>): Promise<Block> {
    return await this.blockRepository.addBlock(block);
  }

  async getBlocks(): Promise<Block[]> {
    return await this.blockRepository.getBlocks();
  }

  async countBlocks(): Promise<number> {
    return await this.blockRepository.countBlocks();
  }
}