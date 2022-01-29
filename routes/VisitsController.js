import Visit from '../Visit.js';

class PostController {
  async create(req, res) {
    try {
      const { employeeName, employeeLastname } = req.body;
      const visit = await Visit.create({ employeeName, employeeLastname });
      res.status(200).json(visit);
    } catch (e) {
      res.status(500);
    }
  }

  async getAll(req, res) {
    try {
      const visits = await Visit.find();
      return res.json(visits);
    } catch (e) {
      res.status(500).json(e);
    }
  }
}

export default new PostController();
