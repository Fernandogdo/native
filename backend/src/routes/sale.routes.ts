import { Router } from "express";
const router = Router()

import { createSale, getSales, getSale, deleteSale, updatedSale } from "../controllers/sale.controller";
import multer from '../libs/multer'

router.route('/sales')
    .get(getSales)
    .post(multer.single('image'), createSale)

router.route('/sales/:id')
    .get(getSale)
    .delete(deleteSale)
    .put(updatedSale)

export default router;