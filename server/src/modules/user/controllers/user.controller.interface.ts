import { NextFunction, Request, Response } from "express";

export interface IUserController {
    getUser(req: Request, res: Response, next: NextFunction): void;
}