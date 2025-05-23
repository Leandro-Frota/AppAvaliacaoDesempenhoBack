import express from "express";
import EmployeeController from "../controller/employeeController.js";

const router = express.Router()

router.get("/", EmployeeController.getEmployees);
router.post("/", EmployeeController.registerEmployee);
router.put("/:id/steps/:step", EmployeeController.updateEmployee);
router.get("/:id", EmployeeController.getEmployeeId);
router.delete("/:id", EmployeeController.deleteEmployeeId);

export default router