import { Request, Response } from "express";
import { UpdateEndDateuseCase } from "./UpdateEndDateUseCase";

export class UpdateEndDateController{

    async handle(request : Request, response: Response){

        const { id_deliveryman} = request;
        const {id : id_delivery} = request.params;

        const updateEndDateuseCase = new UpdateEndDateuseCase();
        const delivery = await updateEndDateuseCase.execute({id_deliveryman, id_delivery });

        return response.json(delivery);
    }



}