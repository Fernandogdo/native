import { Router } from "express";
const router = Router()
const { check } = require('express-validator')
import validateFields  from "../middlewares/validate-fields";
import {  login, renewToken} from "../controllers/auth.controller";
import { validateJWT } from "../middlewares/validate-jwt";

router.route('/login')
    .post(
        [
            check('email', 'The email is required').isEmail(),
            check('password', 'The password is required').not().isEmpty(),
            validateFields
        ], 
        login
    );

router.route('/renew')
    .get(validateJWT, renewToken)
    

export default router;