import { ObjectId } from "mongodb";
import { getDB } from "../config/db.js";
import EmployeeRepository from "../reposytories/employeeRepository.js";

const EmployeeController = {
  getEmployees: async (req, res) => {
    const db = await getDB();

    try {
      const employees = await EmployeeRepository.getEmployees(db);
      res.status(200).send(employees);
    } catch (err) {
      console.error("Error fetching employees:", err);
      res.status(500).json({ error: "Error fetching employees" });
    }
  },
  getEmployeeId: async (req, res) => {
    const { id } = req.params;
    const db = await getDB();
    const employee = await EmployeeRepository.getEmployeeById(db, id);

    if (!employee) {
      return res.status(400).send("Invalid data");
    }

    res.send(employee);
  },
  registerEmployee: async (req, res) => {
    const { name, management, office, registration, status } = req.body;

    try {
      const db = await getDB();
      const newEmployee = await EmployeeRepository.createEmployee(db, {
        name,
        management,
        office,
        registration,
        status,
      });
      res
        .status(201)
        .json({
          message: "Employee registered successfully",
          employee: newEmployee,
        });
    } catch (err) {
      console.error("Erro ao registrar funcionário:", err);
      res.status(500).json({ error: "Erro ao registrar funcionário" });
    }
  },
  updateDataRegisterEmployeeById: async (req, res) => {
    const { name, management, office, registration, status } = req.body;
    const { id } = req.params;

    try {
      const db = await getDB();
      const employee = await EmployeeRepository.getEmployeeById(db, id);
      if (!employee) {
        return res.status(400).send("Employe not found");
      }
      // Filter out undefined values to avoid updating with null
      // or undefined fields
      const updateDataEmployee = Object.fromEntries(
        Object.entries({
          name,
          management,
          office,
          registration,
          status,
        }).filter(([_, value]) => value !== undefined)
      );
      await EmployeeRepository.updateEmployee(db, id, updateDataEmployee);
      res
        .status(200)
        .json({
          message: "Employee updated successfully",
          employee: { ...employee, ...updateDataEmployee },
        });
    } catch (err) {
      console.error("Error updating employee:", err);
      res.status(500).json({ error: "Error updating data employee" });
    }
  },
  updateFormStepByStepEmployee: async (req, res) => {
    const { id, step } = req.params;
    const stepData = req.body;
    try {
      const db = await getDB();
      const employee = await EmployeeRepository.getEmployeeById(db, id);
      if (!employee) {
        return res.status(400).send("Employe not found");
      }
      const updateField = { [`steps.${step}`]: stepData };
      await EmployeeRepository.updateEmployee(db, id, updateField);
      res
        .status(200)
        .json({
          message: "Employee updated successfully",
          employee: { ...employee, ...updateField },
        });
    } catch (err) {
      console.error("Erro status atualization:", err);
      res.status(500).json({ error: "Error updating employee" });
    }
  },
  deleteEmployeeId: async (req, res) => {
    const { id } = req.params;
    const db = await getDB();
    await EmployeeRepository.deleteEmployeeById(db, id);
    res.send("Employee deleted succesfully");
  },
};
export default EmployeeController;
