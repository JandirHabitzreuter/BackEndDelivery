import { Router } from "express";
import { ensureAuthenticateClient } from "./middlewares/ensureAuthenticateClient";
import { ensureAuthenticateDeliveryman } from "./middlewares/ensureAuthenticateDeliveryman";
import { AuthenticateClientController } from "./modules/account/authenticateClient/AuthenticateClientController";
import { AuthenticateDeliverymanController } from "./modules/account/authenticateDeliveryman/AuthenticateDeliverymanController";
import { CreateClientController } from "./modules/clients/useCases/createClient/CreateClientController";
import { FindAllDeliveriesController } from "./modules/clients/useCases/deliveries/FindAllDeliveriesController";
import { CreateDeliveryController } from "./modules/deliveries/useCases/createDelivery/CreateDeliveryController";
import { FindAllWithoutEndDateController } from "./modules/deliveries/useCases/findAllWithoutEndDate/findAllWithoutEndDateController";
import { UpdateDeliverymanController } from "./modules/deliveries/useCases/updateDeliveryman/useCases/UpdateDeliverymanController";
import { UpdateEndDateController } from "./modules/deliveries/useCases/updateEndDate/useCases/UpdateEndDateController";
import { CreateDeliverymanController } from "./modules/deliveryman/useCases/createDeliveryman/CreateDeliverymanController";
import { FindAllDeliveriesDeliverymanController } from "./modules/deliveryman/useCases/FindAllDeliveries/FindAllDeliveriesDeliverymanController";

const routes = Router();

const createClientController = new CreateClientController();
const authenticateClientController = new AuthenticateClientController();
const createDeliverymanController = new CreateDeliverymanController();
const authenticateDeliverymanController = new AuthenticateDeliverymanController();
const createDeliveryController = new CreateDeliveryController();
const findAllWithoutEndDateController = new FindAllWithoutEndDateController();
const updateDeliverymanController = new UpdateDeliverymanController();
const findAllDeliveriesController = new FindAllDeliveriesController();
const findAllDeliveriesDeliverymanController = new FindAllDeliveriesDeliverymanController();
const updateEndDateController = new UpdateEndDateController();

routes.post("/client/authenticate", authenticateClientController.handle);
routes.post("/deliveryman/authenticate", authenticateDeliverymanController.handle);
routes.post("/client", createClientController.handle);
routes.post("/deliveryman", createDeliverymanController.handle);
routes.post("/delivery", ensureAuthenticateClient, createDeliveryController.handle);

routes.get("/delivery/available", 
           ensureAuthenticateDeliveryman, 
           findAllWithoutEndDateController.handle);

routes.get("/client/deliveries", 
           ensureAuthenticateClient, 
           findAllDeliveriesController.handle);  
           
routes.get("/deliveryman/deliveries", 
           ensureAuthenticateDeliveryman,
           findAllDeliveriesDeliverymanController.handle);           

routes.put("/delivery/updateDeliveryman/:id", 
           ensureAuthenticateDeliveryman, 
           updateDeliverymanController.handle);

routes.put("/delivery/updateEndDate/:id", 
           ensureAuthenticateDeliveryman,
           updateEndDateController.handle);

export { routes };