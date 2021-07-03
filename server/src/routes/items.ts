import express from 'express';
import controllers from '../controllers';

const router = express.Router();

router.get(
    '/items',
    controllers.items.index
);

export default router;
