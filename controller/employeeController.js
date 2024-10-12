import { ObjectId } from "mongodb";
import { getDB } from "../config/db.js";

const EmployeeController = {
    getEmployees: async (req,res)=>{
        const db = await getDB();
        const employees =  await db.collection('employee').find().toArray()
        res.send(employees);
    },
    getEmployeeId : async (req,res)=>{
        const {id} = req.params
        const idAsObjectId = ObjectId.createFromHexString(id) 
        const db = await getDB();
        const employee = await db.collection('employee').findOne({_id:idAsObjectId})

        if(!employee){
            return res.status(400).send('Invalid data');
        }

        res.send(employee)
        
    },
    registerEmployee: async (req,res)=>{
        const {name, management, office, registration} = req.body;

        const db = await getDB();

        db.collection('employee').insertOne({name, management, office, registration});

        res.status(201).send('Employee registered successfully');


    },
    updateEmployee: async (req,res)=>{
        const {id} = req.params;
        const {name, management, office, registration} = req.body;
        const idAsObjectId = ObjectId.createFromHexString(id); //converte string em um formato ObjetctId

        const db = await getDB()

       const employee= db.collection('employee').findOne({_id:idAsObjectId} )

        if(!employee){
            return res.status(400).send('Invalid data');
        }

        db.collection('employee').updateOne({_id: idAsObjectId},{$set: {name, management, office, registration} })
        
        res.send('Employee updated successfully');

    },
    deleteEmployeeId:async (req,res)=>{
        const {id} = req.params;
        const idAsObjectId = ObjectId.createFromHexString(id)

        const db = await getDB();
        
       db.collection('employee').deleteOne({_id:idAsObjectId})

       res.send("Employee deleted succesfully")


    }

}

export default EmployeeController;