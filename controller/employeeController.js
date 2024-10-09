import { getDB } from "../config/db.js";

const EmployeeController = {
    getEmployees: (req,res)=>{
        res.send("Empregados cadastrados")
    },
    registerEmployee: async (req,res)=>{
        const {name, management, office, registration} = req.body;

        const db = await getDB();

        db.collection('employee').insertOne({name, management, office, registration});

        res.status(201).send('Employee registered successfully');


    }
}

export default EmployeeController;