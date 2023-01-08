import { prisma } from "../../../database/prismaClient";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";

interface IAuthenticateDeliveryman{
    username: string;
    password: string;
}

export class AuthenticaDeliverymanUseCase{

    async execute({username, password}: IAuthenticateDeliveryman){
        
        //Check if the username is registered  
        const deliveryman = await prisma.deliveryman.findFirst({
            where:{
                username
            }
        });    

        if(!deliveryman){
            throw new Error("username or password is invalidad!");
        }

        //check password
        const passwordMatch = await compare(password, deliveryman.password);

        if(!passwordMatch){
            throw new Error("username or password is invalidad!");   
        }

        // generates then token
        const token = sign({username}, 
                           "b9ca129328916a3867b08cd85e015730",
                           {
                            subject:deliveryman.id,
                            expiresIn: "1d"
                           });

        return token;                           
    }

}