import { getDB } from "../config/db.js";

const EmployeeController = {
    getEmployees: async (req,res)=>{
        const db = await getDB();
        const employees =  await db.collection('employee').find().toArray()
        res.send(employees);
    },
    registerEmployee: async (req,res)=>{
        const {name, management, office, registration} = req.body;

        const db = await getDB();

        db.collection('employee').insertOne({name, management, office, registration});

        res.status(201).send('Employee registered successfully');


    }
}

export default EmployeeController;