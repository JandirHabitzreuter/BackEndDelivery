import { Request, Response } from "express";
import { CreateDeliverymanUseCase } from "./CreateDeliverymanUseCase";

export class CreateDeliverymanController{
    async handle(request : Request, response: Response){
       const {password, username} = request.body;

        const createDeliverymanUserCase = new CreateDeliverymanUseCase();
        const result = await createDeliverymanUserCase.execute({password, username});

        return response.json(result);
    }
}