import { Router } from "express";
import { check } from "express-validator";
const router = Router()

import { createProduct, getProducts, getProduct, deleteProduct, updatedProduct } from "../controllers/product.controller";
import multer from '../libs/multer'
import { validateJWT } from "../middlewares/validate-jwt";

router.route('/products')
    .get(
        validateJWT, 
        getProducts)
    .post(
        // validateJWT, 
        [
            check('category', 'The category id must be valid').isMongoId()
        ],
        
        multer.single('image'), createProduct)

router.route('/products/:id')
    .get(getProduct)
    .delete(
        validateJWT, 
        deleteProduct
        )
    .put(
        // validateJWT, 
        updatedProduct)

export default router;