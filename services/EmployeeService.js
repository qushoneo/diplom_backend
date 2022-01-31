import Employee from '../models/Employee.js';

class EmployeeService {
  async create(employee) {
    if (employee.name.length < 2) {
        throw new Error('error in this field');
    }
    await Employee.create(employee);

    return Employee.find();
  }

  async getAll() {
    const employees = await Employee.find();
    return employees;
  }
}

export default new EmployeeService();
