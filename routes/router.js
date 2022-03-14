import { Router } from 'express';
import EmployeeController from '../controllers/EmployeeController.js';
import AuthController from '../controllers/AuthController.js';
import { check } from 'express-validator';
import authMiddleware from '../middleware/authMiddleware.js';
import roleMiddleware from '../middleware/roleMiddleware.js';
import profileController from '../controllers/profileController.js';

const router = new Router();

router.post('/visits', roleMiddleware(['ADMIN']), EmployeeController.Create);
router.get('/visits', authMiddleware, EmployeeController.GetAll);
router.get('/visits/:id');
router.put('/visits');
router.delete('/visits/:id');
router.post(
  '/signUp',
  [
    check('username', 'Username field cannot be empty!').notEmpty(),
    check(
      'password',
      'Password must be contain more than 4 and less than 16 characters!'
    ).isLength({
      min: 4,
      max: 16,
    }),
  ],
  AuthController.registration
);
router.post('/login', AuthController.login);
router.get('/users', roleMiddleware(['ADMIN']), AuthController.getUsers);
router.get('/profile', authMiddleware, profileController.getMyProfile);

export default router;
