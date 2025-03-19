import express from 'express';
import dotenv from 'dotenv';
import bodyparser from 'body-parser';
import connectDB from './Database/db.js';

dotenv.config();
bodyparser.json();

const app = express();
const port = 3000 || process.env.PORT;

app.listen(port, ()=>{
    connectDB();
    console.log(`app listening on ${port}`);
})