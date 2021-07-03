import express from 'express';
import controllers from '../controllers';
import { auth, validations, uploader } from '../middlewares';

const router = express.Router();

router.post(
    '/point',
    auth.IsUserAuthenticated,
    uploader.PointCreateImageUpload,
    uploader.PointCreateImageCompressor,
    validations.PointCreateDataValidation,
    controllers.points.create,
);

export default router;
