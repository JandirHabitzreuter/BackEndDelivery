import { Request, Response } from "express";
import { AuthenticaDeliverymanUseCase } from "./AuthenticateDeliverymanUseCase";

export class AuthenticateDeliverymanController{
    async handle(request : Request, response: Response){
       const {password, username} = request.body;

       const authenticateDeliverymanUseCase = new AuthenticaDeliverymanUseCase();
       const result = await authenticateDeliverymanUseCase.execute({username, password}); 

       return response.json(result);        
    }
}