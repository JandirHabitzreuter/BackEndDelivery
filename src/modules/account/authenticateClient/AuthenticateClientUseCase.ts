import { prisma } from "../../../database/prismaClient";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";

interface IAuthenticaClient{
    username: string;
    password: string;
}

export class AuthenticaClientUseCase{

    async execute({username, password}: IAuthenticaClient){
        
        //Check if the username is registered  
        const client = await prisma.clients.findFirst({
            where:{
                username
            }
        });    

        if(!client){
            throw new Error("username or password is invalidad!");
        }

        //check password
        const passwordMatch = await compare(password, client.password);

        if(!passwordMatch){
            throw new Error("username or password is invalidad!");   
        }

        // generates then token
        const token = sign({username}, 
                           "b9ca129328916a3867b08cd85e015730",
                           {
                            subject:client.id,
                            expiresIn: "1d"
                           });

        return token;                           
    }

}