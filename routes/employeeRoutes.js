import express from "express";
import EmployeeController from "../controller/employeeController.js";

const router = express.Router()

router.get("/", EmployeeController.getEmployees);
router.post("/", EmployeeController.registerEmployee);
// router.get("/:id", EmployeeController.getEmployeeById);
// router.post("/", EmployeeController.createEmployee);
// router.put("/:id", EmployeeController.updateEmployee);
// router.delete("/:id", EmployeeController.deleteEmployee);

export default router