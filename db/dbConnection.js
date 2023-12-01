import mongoose from "mongoose";

const dbConnection = () => {
    mongoose.connect(process.env.MONGO_URL).then(()=>{
        console.log("Db connected successfully")
    }).catch((err)=>{
        console.log("error while connecting to db",err)
    })
}

export default dbConnection