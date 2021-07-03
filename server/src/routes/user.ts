import express from 'express';
import controllers from '../controllers';
import { auth, validations, uploader } from '../middlewares';

const router = express.Router();

router.post(
    '/user',
    uploader.UserCreateAvatarUpload,
    uploader.UserCreateAvatarCompressor,
    validations.UserCreateDataValidation,
    controllers.user.create,
);

router.get(
    '/user/points',
    auth.IsUserAuthenticated,
    controllers.user.points,
);

export default router;
