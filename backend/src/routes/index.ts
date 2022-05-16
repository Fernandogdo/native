import { Router } from "express";
const router = Router()

import { createCategory, getCategories, getCategory, deleteCategory, updatedCategory } from "../controllers/category.controller";
import multer from '../libs/multer'
import { validateJWT } from "../middlewares/validate-jwt";

router.route('/categories')
    .get(
        validateJWT,
        getCategories
    )
    .post(multer.single('image'), createCategory)

router.route('/categories/:id')
    .get(
        validateJWT,
        getCategory
    )
    .delete(deleteCategory)
    .put(
        validateJWT,
        updatedCategory
    )

export default router;