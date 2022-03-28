import { Router } from "express";
const router = Router()

const { check } = require('express-validator')
import validateFields  from "../middlewares/validate-fields";
import {  login } from "../controllers/auth.controller";

router.route('/login')
    .post(
        [
            check('email', 'The email is required').isEmail(),
            check('password', 'The password is required').not().isEmpty(),
            validateFields
        ], 
        login
    );

// router.route('/users/:id')
//     .get(getUser)
//     .delete(deleteuser)
//     .put(
//         [
//             check('name', 'The name es required').not().isEmpty(),
//             check('email', 'The email is required').isEmail(),
//             check('role', 'The role is required').isEmail(),
//             validateFields
//         ], 
//         updateduser
//         )

export default router;