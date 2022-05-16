import { Router } from "express";
const router = Router()

import { createSale, getSales, getSale, deleteSale, updatedSale } from "../controllers/sale.controller";
import multer from '../libs/multer'
import { validateJWT } from "../middlewares/validate-jwt";

router.route('/sales')
    .get(
        validateJWT, 
        getSales
    )
    .post(multer.single('image'), createSale)

router.route('/sales/:id')
    .get(getSale)
    .delete(
        // validateJWT,
        deleteSale
    )
    .put(
        // validateJWT,
        updatedSale
    )

export default router;