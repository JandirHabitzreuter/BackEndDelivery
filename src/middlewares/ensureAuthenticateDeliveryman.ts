import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface IPayLoad{
    sub:string
}

export async function ensureAuthenticateDeliveryman(request : Request, 
                                               response : Response,
                                               next : NextFunction) {
  const authHeader = request.headers.authorization;
  
  if(!authHeader){
    return response.status(401).json({
        message: "Token missing"
    });
  }

  const [, token] = authHeader.split(" ");

  try {
    //b9ca129328916a3867b08cd85e015730 = Secret phrase
    const {sub} =  verify(token, "b9ca129328916a3867b08cd85e015730") as IPayLoad;

    // not exists id_client in request - view folder @types
    request.id_deliveryman = sub;
    return next();
  } catch (error) {
    return response.status(401).json({
        message: "Invalid token"
    });
    
  }
    
}