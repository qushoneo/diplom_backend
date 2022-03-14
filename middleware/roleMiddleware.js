import jwt from 'jsonwebtoken';
import 'dotenv/config';

export default function roleMiddleware(roles) {
  return function (req, res, next) {
    try {
        const token = req.headers.authorization.split(' ')[1];
      if (!token) {
        return res.status(403).json({ message: 'NOT AUTHORIZED' });
      }

      const { roles: userRoles } = jwt.verify(
        token,
        process.env.JWT_SECRET_KEY
      );
        let hasRole = false;
        console.log(userRoles)
        userRoles.forEach((role) => {
            if (roles.includes(role)){
                hasRole = true;
            }
        })
        if (!hasRole) {
            return res.status(403).json({message:"You have not access!"})
        }
      next();
    } catch (e) {
      console.log(e);
      return res.status(400).json({ message: 'NOT AUTHORIZED' });
    }
  };
}
