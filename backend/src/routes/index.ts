import { Router } from "express";
const router = Router()

import { createCategory, getCategories, getCategory, deleteCategory, updatedCategory } from "../controllers/category.controller";
import multer from '../libs/multer'

router.route('/categories')
    .get(getCategories)
    .post(multer.single('image'), createCategory)

router.route('/categories/:id')
    .get(getCategory)
    .delete(deleteCategory)
    .put(updatedCategory)

export default router;