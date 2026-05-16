import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config();
const db_connect = async() => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log("Db connected successfully")
    } catch (error) {
        console.log("Db not connected ")
        process.exit(1);
    }
}

export default db_connect