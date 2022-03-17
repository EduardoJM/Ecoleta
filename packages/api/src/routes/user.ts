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
    '/user',
    auth.IsUserAuthenticated,
    controllers.user.getMyData,
);

router.get(
    '/user/points',
    auth.IsUserAuthenticated,
    controllers.user.points,
);

router.put(
    '/user',
    auth.IsUserAuthenticated,
    uploader.UserUpdateAvatarUpload,
    uploader.UserCreateAvatarCompressor,
    validations.UserUpdateDataValidation,
    controllers.user.update,
)

export default router;
