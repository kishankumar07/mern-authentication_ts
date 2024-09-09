import mongoose from "mongoose";

const connectDB = async()=>{

    if(!process.env.MONGO_URI){
        throw new Error('MONGO_URI value is not set in the .env file , go and set it');
    }

    try{
        const connect = await mongoose.connect(process.env.MONGO_URI);
        console.log(`Mongodb connected : ${connect.connection.host}`)

    }catch(error:unknown){
       const errorMessage = (error instanceof Error) ? error.message : String(error);
       console.error(`Error is:${errorMessage}`);

        process.exit(1)
    }
}

export default connectDB