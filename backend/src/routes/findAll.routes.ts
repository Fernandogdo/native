import { Router } from "express";
const router = Router()
const { check } = require('express-validator')

import validateFields from "../middlewares/validate-fields";
import { validateJWT } from "../middlewares/validate-jwt";

import { getAll } from "../controllers/findAll.controller";
import multer from '../libs/multer'

router.route('/todo/:name')
    .get(validateJWT, getAll)
    // .post(
    //     [
    //         check('name', 'The name es required').not().isEmpty(),
    //         check('password', 'The password is required').not().isEmpty(),
    //         check('email', 'The email is required').isEmail(),
    //         validateFields
    //     ],
    //     createuser
    // );

// router.route('/todo/:id')
//     .get(getUser)
//     .put(
//         [
//             validateJWT,
//             check('name', 'The name es required').not().isEmpty(),
//             check('email', 'The email is required').isEmail(),
//             check('role', 'The role is required').not().isEmpty(),
//             validateFields
//         ],
//         updateduser
//     )
//     .delete(
//         validateJWT,
//         deleteUser
//         )


export default router;