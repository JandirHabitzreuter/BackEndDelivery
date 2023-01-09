import { hash } from "bcrypt";
import { prisma } from "../../../../database/prismaClient";

interface ICreateClient{
    username: string;
    password: string;
}

export class CreateClientUseCase{

    async execute({ password, username} : ICreateClient){        

        // Validate whether the client exists
        const clientExists = await prisma.clients.findFirst({
            where:{
                username:{
                    equals:username,
                    mode: "insensitive"
                }
            },
        });

        console.log(clientExists)

        if (clientExists){
            throw new Error("Client already exists");
        }

        //Cripto password
        const hashPassword = await hash(password, 10);
        
        // Save the client

        const client = await prisma.clients.create({
            data:{
                username,
                password : hashPassword
            }
        });

        return client;

    };

    

}