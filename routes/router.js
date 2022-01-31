import { Router } from 'express';
import EmployeeController from './EmployeeController.js';

const router = new Router();

router.post('/visits', EmployeeController.Create);
router.get('/visits', EmployeeController.GetAll);
router.get('/visits/:id');
router.put('/visits');
router.delete('/visits/:id');

export default router;
