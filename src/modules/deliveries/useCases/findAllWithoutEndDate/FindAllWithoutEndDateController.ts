import { NextFunction, Request, Response } from "express";
import { FindAllWithoutEndDateUseCase } from "./findAllWithoutEndDateUseCase";

export class FindAllWithoutEndDateController{
    async handle(request: Request, response: Response){
        const findAll = new FindAllWithoutEndDateUseCase();
        const deliveries = await findAll.execute();

        return response.json(deliveries);

    }

}