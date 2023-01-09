import { prisma } from "../../../../database/prismaClient";

interface ICreateDeliveryman{
    username: string;
    password: string;
}

export class FindAllDeliveriesDeliverymanUseCase{

    async execute(id_deliveryman : string){ 
        const deliveries = await prisma.deliveryman.findMany({
            where:{
                id : id_deliveryman,
            },
            select:{
                Deliveries : true,
                id : true,
                username : true,
            }
        });      

        return deliveries;
    };  

}