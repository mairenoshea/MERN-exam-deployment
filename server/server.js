import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import dbConnect from './config/mongoose.config.js';
import axios from 'axios';

import router from './routes/Patients.routes.js';


const app=express();

app.use(express.json(), cors());
dotenv.config();
const PORT=process.env.PORT;
dbConnect();
app.use('/api',router);


app.listen(PORT,()=>{
    console.log(`Server is running on port: ${PORT}`)
});