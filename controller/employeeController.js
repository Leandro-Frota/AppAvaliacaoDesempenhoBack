import { ObjectId } from "mongodb";
import { getDB } from "../config/db.js";
import EmployeeRepository  from "../reposytories/employeeRepository.js";

const EmployeeController = {
    getEmployees: async (req,res)=>{
        const db = await getDB();
        const employees =  await EmployeeRepository.getEmployees(db)
        res.send(employees);
    },
    getEmployeeId : async (req,res)=>{
        const {id} = req.params
        const db = await getDB();
        const employee = await EmployeeRepository.getEmployeeById(db,id);

        if(!employee){
            return res.status(400).send('Invalid data');
        }

        res.send(employee)
        
    },
    registerEmployee: async (req,res)=>{
        const {name, management, office, registration} = req.body;

        try{
            const db = await getDB();        
            const newEmployee =  await EmployeeRepository.createEmployee(db,{name,management,office,registration})     
            res.status(201).json({message:"Employee registered successfully",employee: newEmployee});
        }catch(err){
            console.error("Erro ao registrar funcionário:", err);
            res.status(500).json({error:"Erro ao registrar funcionário"});
        } 


    },
    updateEmployee: async (req,res)=>{
        const {id} = req.params;
        const updatedData = req.body;

      
        const db = await getDB();
        const employee = await EmployeeRepository.getEmployeeById(db,id);

        if(!employee){
            return res.status(400).send('Employe not found');
        }

        try{
            await EmployeeRepository.updateEmployee(db,id,updatedData);
            res.status(200).json({message:"Employee updated successfully", employee:{...employee, ...updatedData}});
           
        }catch(err){
            console.error("Erro status atualization:", err);
            res.status(500).json({error:"Error updating employee"});
        }

    

    },
    deleteEmployeeId:async (req,res)=>{
        const {id} = req.params;
        const db = await getDB();

        await EmployeeRepository.deleteEmployeeById(db,id)
        
       

       res.send("Employee deleted succesfully")


    }

}

export default EmployeeController;