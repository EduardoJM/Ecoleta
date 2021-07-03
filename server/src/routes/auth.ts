import express from 'express';
import controllers from '../controllers';
import { validations } from '../middlewares';

const router = express.Router();

router.post(
    '/auth',
    validations.AuthDataValidation,
    controllers.auth.login,
);

export default router;
