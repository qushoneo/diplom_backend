import EmployeeService from "../services/EmployeeService.js";

class EmployeeController {
  async Create(req, res) {
    try {
      const employee = await EmployeeService.create(req.body)
      res.json(employee)
    } catch (e) {
      res.status(500).json(e)
    }
  }

  async GetAll(req, res) {
    try {
      const employees = await EmployeeService.getAll()
      res.status(200).json(employees)
    } catch (e) {
      res.status(500).json(e)
    }
  }
  
}

export default new EmployeeController();
