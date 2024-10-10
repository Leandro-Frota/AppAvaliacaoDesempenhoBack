import express from "express"
import cors from "cors"
import employeeRoutes from "./routes/employeeRoutes.js";
import { connectDb } from './config/db.js';
import logMiddleware from "./middleware/logMiddleware.js";
import rateLimitMiddleware from "./middleware/rateLimiteMiddleware.js";

const app = express()

app.use(express.json());
app.use(cors());

app.use(logMiddleware);
app.use(rateLimitMiddleware)

const PORT = 3001

app.use('/employees',employeeRoutes)

app.listen(PORT, async ()=>{
    console.log(`Server is running on port ${PORT}` )
    await connectDb()
})

