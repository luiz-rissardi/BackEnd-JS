import express, { json } from "express"
import cors from "cors"
import dotenv from "dotenv"
import http from "http"

import { DataBase } from "./src/db/dataBase.js"
import { Routers } from "./src/routes/userRoutes.js"
import { UserController } from "./src/controller/UserController.js"
import { UserModel } from "./src/model/userModel.js"
import { middleareSecurity } from "./config.js"

const Express = express();
dotenv.config();

class App {
    Banco;
    Routes;
    constructor(banco, routes) {
        this.Banco = banco
        this.Routes = routes
    }

    initApp(){
        try {
            this.Banco.Connect()
            const server = http.createServer(Express)
            Express.use(cors())
            Express.use(json())
            Express.set("trust proxy",1)
            Express.use("/api",middleareSecurity,this.Routes)
            server.listen(process.env.PORT || 3000)
        } catch (error) {
            return "não foi possivel conectar no servidor"
        }
    }
}


function init() {
    const controll = new UserController(UserModel)
    const routes = new Routers(controll)
    const database = new DataBase()
    const app = new App(database, routes.createRoutes())
    app.initApp();
}

init()