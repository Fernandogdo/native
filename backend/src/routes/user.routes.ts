import { Router } from "express";
const router = Router()
const { check } = require('express-validator')

import validateFields  from "../middlewares/validate-fields";

import { getUsers, getUser, createuser, deleteuser, updateduser } from "../controllers/user.controllers";
import multer from '../libs/multer'

router.route('/users')
    .get(getUsers)
    .post(
        [
            check('name', 'The name es required').not().isEmpty(),
            check('password', 'The password is required').not().isEmpty(),
            check('email', 'The email is required').isEmail(),
            validateFields
        ], 
        createuser
    );

router.route('/users/:id')
    .get(getUser)
    .delete(deleteuser)
    .put(
        [
            check('name', 'The name es required').not().isEmpty(),
            check('email', 'The email is required').isEmail(),
            check('role', 'The role is required').isEmail(),

            // validateFields
        ], 
        updateduser
        )

export default router;