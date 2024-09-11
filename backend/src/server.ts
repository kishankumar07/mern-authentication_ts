import express from "express"
import dotenv from 'dotenv';
import path from "path";
import cookieParser from 'cookie-parser'
dotenv.config();
import { notFound,errorHandler } from "./middleware/errorMiddleware";
import connectDB from './config/dbConnect'
const port = process.env.PORT || 5000;
import userRoutes from './routes/userRoutes'
import adminRoutes from './routes/adminRoutes'

connectDB();
const app = express(); 
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use('/uploads',express.static(path.join(__dirname,'../public/uploads')))
app.use(cookieParser());
app.use('/api/users',userRoutes);
app.use('/api/admin',adminRoutes)

app.get('/',(req,res)=>res.send('server is running'));

app.use(notFound);
app.use(errorHandler)

app.listen(port,()=>console.log(`server running at http://localhost:${port}`)); 



 