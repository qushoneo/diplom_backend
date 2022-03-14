import Role from '../models/Role.js';
import User from '../models/User.js';
import bcrypt from 'bcryptjs/dist/bcrypt.js';
import { validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

const generateAccessToken = (user) => {
  const payload = {
   user
  };
  return jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: '24h' });
};

class AuthController {
  async registration(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json(errors);
      }
      const { username, password } = req.body;
      const createdAt = new Date();
      const candidate = await User.findOne({ username });
      if (candidate) {
        return res.status(400).json({ message: 'User is exist' });
      }
      let hashPassword = bcrypt.hashSync(password, 7);
      const userRole = await Role.findOne({ value: 'USER' });
      const user = new User({
        username,
        password: hashPassword,
        createdAt,
        roles: [userRole.value],
      });
      await user.save();
      return res.json({ message: 'Success!' });
    } catch (e) {
      res.status(400).json({ message: 'Error' });
    }
  }
  async login(req, res) {
    try {
      const { username, password } = req.body;

      const user = await User.findOne({ username });
      if (!user) {
        return res.status(400).json({ message: `User ${username} not found!` });
      }
      const validPassword = bcrypt.compareSync(password, user.password);
      if (!validPassword) {
        return res.status(400).json({ message: 'Invalid password' });
      }
      const token = generateAccessToken(user);
      return res.json({token});
    } catch (e) {
      console.log(e);
    }
  }
  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users)
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: 'Error' });
    }
  }
}

export default new AuthController();
