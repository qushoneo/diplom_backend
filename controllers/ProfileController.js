import 'dotenv/config';
import User from '../models/User.js'

class ProfileController {
  async getMyProfile(req, res) {
    try {
      const profile = await User.findOne(req.body.username);
      res.json(profile);
    } catch (e) {
      res.status(500).json(e);
    }
  }
}

export default new ProfileController();
