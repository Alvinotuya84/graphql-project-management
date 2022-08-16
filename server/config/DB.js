import mongoose from "mongoose";
export const ConnectDb=async()=>{
    const conn=await mongoose.connect(process.env.MONGO_URL);
    console.log(`MOngodb connected ${conn.connection.host}`.cyan.underline.bold)
}

