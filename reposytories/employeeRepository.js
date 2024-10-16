import { ObjectId } from "mongodb"

const EmployeeRepository = {
    getEmployeeById: async (db,id)=>{
        const idAsObjectId = ObjectId.createFromHexString(id) 
        return await db.collection('employee').findOne({_id:idAsObjectId})
    },
    getEmployees: async (db)=>{
       return await db.collection('employee').find().toArray()
    },
    createEmployee: async (db,employee)=>{

        await db.collection('employee').insertOne(employee);
    },
    updateEmployee: async (db,id,employee)=>{
        const idAsObjectId = ObjectId.createFromHexString(id)

        await db.collection('employee').updateOne({ _id: idAsObjectId }, { $set: employee });

    },
    deleteEmployeeById: async (db,id)=>{
        const idAsObjectId = ObjectId.createFromHexString(id);

        await db.collection('employee').deleteOne({_id:idAsObjectId})


    }
}

export default EmployeeRepository