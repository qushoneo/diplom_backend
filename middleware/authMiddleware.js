import jwt from 'jsonwebtoken';
import 'dotenv/config';

export default function authMiddleware (req, res, next) {
  if (req.method === 'OPTIONS') {
    next();
  }

  try {
    const token = req.query.token;

    if (!token) {
      return res.status(403).json({ message: 'NOT AUTHORIZED' });
    }
      const decodedData = jwt.verify(token, process.env.JWT_SECRET_KEY);
      req.user = decodedData;
      next()
  } catch(e) {
    console.log(e);
    return res.status(401).json({ message: 'NOT AUTHORIZED' });
  }
};
