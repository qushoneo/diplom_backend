import { Router } from 'express';
import VisitsController from './VisitsController.js';

const router = new Router();

router.post('/visits', VisitsController.create);
router.get('/visits', VisitsController.getAll);
router.get('/visits/:id');
router.put('/visits');
router.delete('/visits/:id');

export default router;
