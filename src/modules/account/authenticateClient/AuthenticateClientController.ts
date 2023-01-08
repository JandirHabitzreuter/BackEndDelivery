import { Request, Response } from "express";
import { AuthenticaClientUseCase } from "./AuthenticateClientUseCase";

export class AuthenticateClientController{
    async handle(request : Request, response: Response){
       const {password, username} = request.body;

       const authenticateClientUseCase = new AuthenticaClientUseCase();
       const result = await authenticateClientUseCase.execute({username, password}); 

       return response.json(result);        
    }
}