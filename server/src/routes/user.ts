import express from 'express';
import controllers from '../controllers';
import { validations, uploader } from '../middlewares';

const router = express.Router();

router.post(
    '/user',
    uploader.UserCreateAvatarUpload,
    uploader.UserCreateAvatarCompressor,
    validations.UserCreateDataValidation,
    controllers.user.create,
);

export default router;
