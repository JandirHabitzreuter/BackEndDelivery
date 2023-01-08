import { hash } from "bcrypt";
import { prisma } from "../../../../database/prismaClient";

interface ICreateDeliveryman{
    username: string;
    password: string;
}

export class CreateDeliverymanUseCase{

    async execute({ password, username} : ICreateDeliveryman){       

        // Validate whether the deliveryman exists
        const deliverymanExists = await prisma.deliveryman.findFirst({
            where:{
                username
            },
        });       

        if (deliverymanExists){
            throw new Error("Deliveryman already exists");
        }

        //Cripto password
        const hashPassword = await hash(password, 10);
        
        // Save the client

        const deliveryman = await prisma.deliveryman.create({
            data:{
                username,
                password : hashPassword
            }
        });

        return deliveryman;

    };

    

}