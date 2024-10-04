import express from "express"
import employeeRoutes from "./routes/employeeRoutes.js";

const app = express()

app.use(express.json());

const PORT = 3001

app.use('/employees',employeeRoutes)

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}` )
})

