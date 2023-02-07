import { set, connect } from "mongoose"

class DataBase{
    constructor(){
        set("strictQuery",true)
    }
    async Connect(){
        try {
            await connect(process.env.MONGODB_URI)
            console.log("banco conectado")
        } catch (error) {
            console.log(error)
            console.log("erro ao conectar no banco")
        }
    }
}

export {
    DataBase
}