import { Request, Response } from "express";
import { CreateClientUseCase } from "./CreateClientUseCase";

export class CreateClientController{
    async handle(request : Request, response: Response){
       const {password, username} = request.body;

        const createClientUserCase = new CreateClientUseCase();
        const result = await createClientUserCase.execute({password, username});

        return response.json(result);
    }
}