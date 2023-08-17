import express, { NextFunction,Response,Request } from "express";
import {json} from "body-parser";
import Todoroutes from "./Routes/Todos"
const app = express();
app.use(json())


app.use("/todos",Todoroutes);
app.use((err:Error,_req:Request,res:Response,_next:NextFunction):void=>{
res.status(500).json({message:err.message})
})
app.listen(3000,()=>{
    console.log("Server Running");
    
})

