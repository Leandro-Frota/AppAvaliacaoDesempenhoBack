import express from "express"
import employeeRoutes from "./routes/employeeRoutes.js";
import { connectDb } from './config/db.js';

const app = express()

app.use(express.json());

const PORT = 3001

app.use('/employees',employeeRoutes)

app.listen(PORT, async ()=>{
    console.log(`Server is running on port ${PORT}` )
    await connectDb()
})

