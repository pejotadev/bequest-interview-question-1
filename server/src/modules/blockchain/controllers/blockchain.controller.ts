import { IBlockController } from "./blockchain.controller.interface";
import { Blockchain } from "../blockchain";
import { NextFunction, Request, Response } from "express"
import { STATUS_CODE } from "../../../utils/status.codes";
import { AddBlockDTO } from "../dtos/add.block.dto";

export class BlockchainController implements IBlockController {

  constructor(private blockchain: Blockchain) {
  }

  addBlock = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { body }: { body: any } = req;
      const addBlockDTO = AddBlockDTO.validate(body);
      const response = await this.blockchain.addBlock(addBlockDTO);
      res.status(STATUS_CODE.CREATED).send(response)
    } catch (error) {
      next(error);
    }
  };

  getLastBlock = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const response = await this.blockchain.getLastBlock();
      res.status(STATUS_CODE.OK).send(response);
    } catch (error) {
      next(error);
    }
  };

  isChainValid = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const response = await this.blockchain.isChainValid();

      if (!response) {
        res.status(STATUS_CODE.BAD_REQUEST).send({
          message: 'The chain is not valid!'
        });
      }
      
      res.status(STATUS_CODE.OK).send(response);
    } catch (error) {
      next(error);
    }
  };

  getChain = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const response = await this.blockchain.getChain();
      res.status(STATUS_CODE.OK).send(response);
    } catch (error) {
      next(error);
    }
  };

  recoverChain = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const response = await this.blockchain.recoverChain();
      if (!response) {
        res.status(STATUS_CODE.BAD_REQUEST).send({
          message: 'The chain could not be recovered from the database! contact some adminstrator!'
        });
      }
      res.status(STATUS_CODE.OK).send(response);
    } catch (error) {
      next(error);
    }
  };
}