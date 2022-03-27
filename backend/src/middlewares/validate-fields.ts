import { response } from "express";
import { validationResult } from "express-validator";


const validateFields = (req: Request, res = response, next: any) => {
    const errores = validationResult(req);


    if (!errores.isEmpty()) {
        return res.status(400).json({
            ok: false,
            errores: errores.mapped()
        })
    }

    next()
}


export default validateFields;

// module.exports = {
//     validateFields
// }

