import express from 'express';
import controllers from '../controllers';
import { auth, validations, uploader } from '../middlewares';

const router = express.Router();

router.post(
    '/point',
    auth.IsUserAuthenticated,
    controllers.points.create,
);

export default router;
